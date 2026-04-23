import { Hero } from "@/pages/home/sections/Hero";
import { useEffect, useState } from "react";
import { Trending } from "./sections/Trending";
import { Popular } from "./sections/Popular";
import { Tabs } from "@/components/Tabs";
import { MovieCard } from "../../components/MovieCard";

export const Home = () => {

    const slides = [
        "/pggg2.jpeg",
        "/pggg.jpeg"
    ];

    const [active, setActive] = useState(0);

    const tabItems = [
        {
            id: "today",
            title: "Today",
            content: <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll ">
                {
                    [...Array(20)].map((_, ind) => (
                        <MovieCard key={ind} image="/pggg.jpeg" title="Peaky Blinder" year="2013" showFav={false} display="video" />
                    ))
                }
            </div>
        },
        {
            id: "week",
            title: "This Week",
            content: <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll py-4">
                {
                    [...Array(20)].map((_, ind) => (
                        <MovieCard key={ind} image="/pggg2.jpeg" title="Peaky Blinder" year="2013" showFav={false} display="video" />
                    ))
                }
            </div>
        },

    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev + 1) % slides.length);
        }, 20000);

        return () => clearInterval(interval);
    }, []);
    return (
        <main className="">
            {/* Hero section */}
            <Hero />

            {/* trending section */}
            <Trending />

            {/* latest upcoming, top-rated */}
            {/* <section className="py-12 relative overflow-hidden my-4">
                <div className="container-fluid mx-auto h-100 px-1 lg:px-6 py-4 bg-primary-foreground">

                </div>

            </section> */}

            <section className="relative h-[49vh] overflow-hidden my-4">
                {/* background slideshow */}
                <div className="absolute inset-0">
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

                    {/* overlay */}
                    {/* <div className="absolute inset-0 bg-primary/50 z-10 pointer-events-none" /> */}
                    <div className="absolute inset-0 bg-black/75" />
                </div>

                {/* content */}
                <div className="relative z-10 h-full flex items-end">
                    <div className="container mx-auto px-6 pb-16">
                        <Tabs
                            title="Trending"
                            items={tabItems}
                            defaultTab="today"

                        />
                    </div>
                </div>
            </section>


            {/* Popular Section */}
            <Popular />
        </main>

    );
}