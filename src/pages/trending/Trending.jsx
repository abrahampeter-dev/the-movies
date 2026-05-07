import { useEffect, useState } from "react";
import { getSearchTv, getTopReatedTv } from "@/services/apis";
import { CustomSearch } from "@/components/Search";
import { CustomError } from "@/components/Error";
import { CustomLoading } from "@/components/Loading";
import { MovieCard } from "@/components/MovieCard";
import { getAllTrending } from "@/services/apis";
import { Tabs } from "@/components/Tabs";

export const Trending = () => {


    //
    const [trending, setTrending] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //
    const [page, setPage] = useState(1);
    const [timeWindow, setTimeWindow] = useState('day');
    const [totalPages, setTotalPages] = useState(1);

    //
    const [query, setQuery] = useState("");

    //load trending
    const loadtrending = async () => {
        setLoading(true);
        setError(null);

        try {
            let ptrending;
            if (query) {
                //search
                ptrending = await getSearchTv(query, page);
            } else {
                //normal data
                ptrending = await getAllTrending(timeWindow, page);

            }

            setTrending(ptrending.results);
            setTotalPages(ptrending.totalPages);

        } catch (err) {
            console.log(err)
            setError("Fail to load tv series");
        } finally {
            setLoading(false);
        }
    }


    //
    const tabItems = [
        {
            id: "day",
            title: "Today",
            content: loading ? <CustomLoading /> :
                <>

                    <div className="grid md:grid-cols-6 grid-cols-2 gap-4 py-4">
                        {
                            trending.map((tv) => {
                                const link = tv.media_type === "movie" ? `/movies/${tv.id}` : `/tv-series/${tv.id}`
                                return (
                                    <MovieCard
                                        key={tv.id}
                                        image={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                        title={tv.media_type === "movie" ? tv.title : tv.name}
                                        year={tv.media_type === "movie" ? tv.release_date : tv.first_air_date}
                                        type={tv.media_type === "movie" ? "MV" : "TV"}
                                        rate={tv.vote_average}
                                        showFav={false}
                                        id={tv.id}
                                        to={link}
                                    // to={({ id }) => }

                                    />
                                )
                            })
                        }
                    </div>

                    {/* pagination */}
                    <div className="flex justify-center items-center gap-2 py-6">
                        <button onClick={() => setPage((p) => Math.max(p - 1, 1))}
                            disabled={page === 1}
                            className="px-8 py-2 text-white bg-muted-foreground rounded disabled:opacity-50"
                        >Prev</button>
                        <span className="text-sm">Page {page} of {totalPages}</span>
                        <button onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                            disabled={page === totalPages}
                            className="px-8 py-2 bg-primary-foreground text-primary rounded disabled:opacity-50"
                        >Next</button>
                    </div>
                </>
        },
        {
            id: "week",
            title: "This Week",
            content: loading ? <CustomLoading /> : <>
                <div className="grid md:grid-cols-6 grid-cols-2 gap-4 py-4">
                    {
                        trending.map((tv) => {
                            const link = tv.media_type === "movie" ? `/movies/${tv.id}` : `/tv-series/${tv.id}`
                            return (
                                <MovieCard
                                    key={tv.id}
                                    image={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                    title={tv.media_type === "movie" ? tv.title : tv.name}
                                    year={tv.media_type === "movie" ? tv.release_date : tv.first_air_date}
                                    type={tv.media_type === "movie" ? "MV" : "TV"}
                                    showFav={false}
                                    rate={tv.vote_average}
                                    id={tv.id}
                                    to={link}
                                // to={({ id }) => }

                                />
                            )
                        }
                        )
                    }
                </div>

                {/* pagination */}
                <div className="flex justify-center items-center gap-2 py-6">
                    <button onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        disabled={page === 1}
                        className="px-8 py-2 text-white bg-muted-foreground rounded disabled:opacity-50"
                    >Prev</button>
                    <span className="text-sm">Page {page} of {totalPages}</span>
                    <button onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                        disabled={page === totalPages}
                        className="px-8 py-2 bg-primary-foreground text-primary rounded disabled:opacity-50"
                    >Next</button>
                </div>
            </>
        },

    ];

    //
    const tabChange = (tabId) => {
        setTimeWindow(tabId);
        setPage(1);
    }

    //search
    const searchTv = async (searchQ) => {
        setQuery(searchQ);
        setPage(1);
    }

    useEffect(() => {
        loadtrending();
    }, [timeWindow, page, query]);


    if (!trending) return (
        <div className="flex justify-center items-center h-screen">
            <CustomError text="No Data" onRetry={loadtrending} />
        </div>
    );

    return (
        <div className="py-32 relative overflow-hidden">

            {/* search */}
            <CustomSearch onSearch={searchTv} />


            <div className="container mx-auto px-4 md:px-1 lg:px-6">
                {/* HEADER */}
                <div className="gap-4 mb-6">
                    <h1 className="text-2xl md:text-4xl font-bold">
                        Top Rated Tv Series
                    </h1>

                </div>


                <Tabs
                    title="Trending"
                    items={tabItems}
                    defaultTab="day"
                    onChange={tabChange}
                />


            </div>

        </div>
    )
}