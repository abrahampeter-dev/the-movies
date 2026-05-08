import { useEffect, useState } from "react";
import { Tabs } from "@/components/Tabs";
import { MovieCard } from "../../../components/MovieCard";
import { getAllTrending } from "@/services/apis";


export const Trending = () => {

    const [trend, setTrend] = useState([]);

    //
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //
    const [page, setPage] = useState(1);
    const [timeWindow, setTimeWindow] = useState('day');

    //
    const loadTrending = async () => {
        setLoading(true)
        setError(null);

        try {
            const data = await getAllTrending(timeWindow, page)
            setTrend(data.results);
            console.log(data);

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
            content: <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll py-4">
                {
                    trend.map((td) => {
                        const link = td.media_type === "movie" ? `/movies/${td.id}` : `/tv-series/${td.id}`

                        return (

                            <MovieCard
                                key={td.id}
                                image={`https://image.tmdb.org/t/p/w500${td.poster_path}`}
                                title={td.media_type === "movie" ? td.title : td.name}
                                year={td.media_type === "movie" ? td.release_date : td.first_air_date}
                                type={td.media_type === "movie" ? "MV" : "TV"}
                                rate={td.vote_average}
                                showFav={false}
                                id={td.id}
                                to={link}


                            />
                        )
                    })
                }
            </div>
        },
        {
            id: "week",
            title: "This Week",
            content: <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll py-4">
                {
                    trend.map((td) => {
                        const link = td.media_type === "movie" ? `/movies/${td.id}` : `/tv-series/${td.id}`

                        return (

                            <MovieCard
                                key={td.id}
                                image={`https://image.tmdb.org/t/p/w500${td.poster_path}`}
                                title={td.media_type === "movie" ? td.title : td.name}
                                year={td.media_type === "movie" ? td.release_date : td.first_air_date}
                                type={td.media_type === "movie" ? "MV" : "TV"}
                                rate={td.vote_average}
                                showFav={false}
                                id={td.id}
                                to={link}
                            />
                        )
                    })
                }
            </div>
        },
    ];

    const tabChange = (tabId) => {
        setTimeWindow(tabId);
        setPage(1);
    }

    useEffect(() => {
        loadTrending();
    }, [timeWindow, page]);

    return (
        <section className="py-12 relative overflow-hidden">
            <div className="container mx-auto px-1 lg:px-6">
                <Tabs
                    title="Trending"
                    items={tabItems}
                    defaultTab="day"
                    onChange={tabChange}
                />
            </div>

        </section>
    );
}