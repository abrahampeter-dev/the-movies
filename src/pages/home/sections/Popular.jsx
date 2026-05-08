import { MovieCard } from "@/components/MovieCard";
import { Tabs } from "@/components/Tabs";
import { useEffect, useState } from "react";
import { getPopularTv, getPopularMovies } from "@/services/apis";


export const Popular = () => {

    const [movies, setMovies] = useState([]);
    const [slides, setSlides] = useState([]);

    //
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //
    const [page, setPage] = useState(1);
    const [mediaType, setMediaType] = useState('movie');

    //
    const [active, setActive] = useState(0);


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

    //
    const loadSlides = async () => {
        setLoading(true);
        setError(null);

        try {

            const data = await getPopularMovies(page);

            //
            const images = data.results.filter((m) => m.backdrop_path)
                .slice(0, 5)
                .map((m) => `https://image.tmdb.org/t/p/original${m.backdrop_path}`);


            setSlides(images);

        } catch (err) {
            setError("Fail to load slides");
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
        loadSlides();
    }, [mediaType]);


    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 20000);

        return () => clearInterval(interval);
    }, [slides]);

    return (
        <section className="relative min-h-[60vh] my-4 pb-10 flex flex-col justify-center">

            {/* background slideshow */}
            <div className="absolute inset-0 overflow-hidden">

                {slides.map((img, i) => (
                    <img
                        key={i}
                        src={img}
                        alt="upcoming"
                        className={`
                    absolute inset-0 w-full h-full
                    object-cover object-top md:object-[center_12%]
                    transition-opacity duration-1000 ease-in-out
                    ${i === active ? "opacity-100" : "opacity-0"}
                `}
                    />
                ))}

                <div className="absolute inset-0 bg-black/75" />
            </div>

            {/* content */}
            <div className="relative z-10 h-full flex flex-col justify-end">
                <div className="container mx-auto px-1 lg:px-6">
                    <Tabs
                        title="What's Popular"
                        items={tabItems}
                        defaultTab="movie"
                        onChange={tabChange}

                    />
                </div>
            </div>

        </section>

        // </section>
    );

}