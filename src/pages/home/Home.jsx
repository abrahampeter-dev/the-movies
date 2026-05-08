import { Hero } from "@/pages/home/sections/Hero";
import { useEffect, useState } from "react";
import { Trending } from "./sections/Trending";
import { Popular } from "./sections/Popular";
import { Tabs } from "@/components/Tabs";
import { MovieCard } from "../../components/MovieCard";
import { getAllArtists, getOnTheAirTv, getPopularMovies } from "../../services/apis";

export const Home = () => {

    const [movies, setMovies] = useState([]);
    const [latest, setLatest] = useState([]);
    const [slides, setSlides] = useState([]);
    const [mediaType, setMediaType] = useState('movie');

    //
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    //
    const [page, setPage] = useState(1);


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

    //
    const loadLatest = async () => {
        setLoading(true);
        setError(null);

        try {

            let data;

            if (mediaType === "mv") {

            } else {
                data = await getOnTheAirTv(page);
            }
            setLatest(data.results);

        } catch (err) {
            console.log(err)
            setError("Fail to load tv series");
        } finally {
            setLoading(false);
        }
    }

    //
    const tabChange = (tabId) => {
        setMediaType(tabId);
        setPage(1);
    }

    //
    useEffect(() => {
        loadSlides();
        loadLatest();
    }, [mediaType]);



    const [active, setActive] = useState(0);

    const tabItems = [
        {
            id: "movie",
            title: "upcoming",
            content: <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll ">
                {
                    [...Array(20)].map((_, ind) => (
                        <MovieCard key={ind} image="/pggg.jpeg" title="Peaky Blinder" year="2013" showFav={false} display="video" />
                    ))
                }
            </div>
        },
        {
            id: "tv",
            title: "On Tv",
            content: <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll py-4">
                {
                    latest.map((td) => {
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
                                display="video"

                            />
                        )
                    })
                }
            </div>
        },

    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 20000);

        return () => clearInterval(interval);
    }, [slides]);

    return (
        <main className="">
            {/* Hero section */}
            <Hero />

            {/* trending section */}
            <Trending />

            {/* whats popular */}





            {/* Popular Section */}
            <Popular />
        </main>

    );
}