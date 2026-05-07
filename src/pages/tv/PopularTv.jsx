import { useEffect, useState } from "react"
import { getPopularTv, getSearchTv } from "../../services/apis";
import { CustomSearch } from "../../components/Search";
import { CustomError } from "../../components/Error";
import { CustomLoading } from "../../components/Loading";
import { MovieCard } from "@/components/MovieCard";


export const PopularTv = () => {

    //
    const [tvs, setTvs] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    //
    const [query, setQuery] = useState("");

    //load tvs
    const loadTvs = async () => {
        setLoading(true);
        setError(null);

        try {
            let pTvs;
            if (query) {
                //search
                pTvs = await getSearchTv(query, page);
            } else {
                //normal data
                pTvs = await getPopularTv(page);
            }

            setTvs(pTvs.results);
            setTotalPages(pTvs.totalPages);

            console.log(pTvs);
        } catch (err) {
            console.log(err)
            setError("Fail to load tv series");
        } finally {
            setLoading(false);
        }
    }

    //search
    const searchTv = async (searchQ) => {
        setQuery(searchQ);
        setPage(1);
    }

    useEffect(() => {
        loadTvs();
    }, [page, query]);

    return (
        <div className="py-32 relative overflow-hidden">

            {/* search */}
            <CustomSearch onSearch={searchTv} />


            <div className="container mx-auto px-4 md:px-1 lg:px-6">
                {/* HEADER */}
                <div className="gap-4 mb-6">
                    <h1 className="text-2xl md:text-4xl font-bold">
                        Tv Series
                    </h1>

                </div>

                {/* error */}
                {error && !loading && <CustomError text={error} onRetry={loadTvs} />}
                {/* tv series data */}
                {
                    loading ? <CustomLoading text="Loading tv series..." />

                        :
                        (
                            <>
                                <div className="grid md:grid-cols-6 grid-cols-2 gap-4 py-4">
                                    {
                                        tvs.map((tv) => (
                                            <MovieCard
                                                key={tv.id}
                                                image={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                                                title={tv.name} year={tv.first_air_date} type="TV"
                                                rate={tv.vote_average}
                                                showFav={false}
                                                id={tv.id}
                                                to={({ id }) => `/tv-series/${id}`}

                                            />
                                        ))
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
                        )
                }

            </div>

        </div>
    )
}