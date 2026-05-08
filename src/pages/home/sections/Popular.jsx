import { MovieCard } from "@/components/MovieCard";
import { Tabs } from "@/components/Tabs";
import { useEffect, useState } from "react";
import { getPopularTv, getPopularMovies } from "@/services/apis";


export const Popular = () => {

    const [movies, setMovies] = useState([]);

    //
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //
    const [page, setPage] = useState(1);
    const [mediaType, setMediaType] = useState('movie');

    //
    const loadWhatsPopular = async () => {
        setLoading(true);
        setError(null);

        try {

            let data;

            if (mediaType === 'movie') {
                data = await getPopularMovies(page);
                // console.log("movie", data.results);

            } else {
                data = await getPopularTv(page);
                // console.log("tv", data.results);

            }

            setMovies(data.results);


        } catch (err) {
            console.log(err)
            setError("Fail to load data");
        } finally {
            setLoading(false);
        }
    }

    const tabItems = [
        {
            id: "movie",
            title: "Movies",
            content: <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll py-4">
                {
                    movies.map((mv) => {
                        const link = `/movies/${mv.id}`;

                        return (

                            <MovieCard
                                key={mv.id}
                                image={`https://image.tmdb.org/t/p/w500${mv.poster_path}`}
                                title={mv.title}
                                year={mv.release_date}
                                type="MV"
                                rate={mv.vote_average}
                                showFav={false}
                                id={mv.id}
                                to={link}


                            />
                        )
                    })
                }
            </div>
        },
        {
            id: "tv",
            title: "TV Series",
            content: <div className="flex gap-2 lg:gap-4 overflow-x-auto scroll-smooth firefox-scroll py-4">
                {
                    movies.map((td) => {
                        const link = `/tv-series/${td.id}`

                        return (

                            <MovieCard
                                key={td.id}
                                image={`https://image.tmdb.org/t/p/w500${td.poster_path}`}
                                title={td.name}
                                year={td.first_air_date}
                                type={"TV"}
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
        setMediaType(tabId);
        setPage(1);
    }

    useEffect(() => {
        loadWhatsPopular();
    }, [mediaType]);

    return (
        <section className="py-12 relative overflow-hidden">
            <div className="container mx-auto px-1 lg:px-6">
                <Tabs
                    title="What's Popular"
                    items={tabItems}
                    defaultTab="movie"
                    onChange={tabChange}

                />
            </div>

        </section>
    );

}