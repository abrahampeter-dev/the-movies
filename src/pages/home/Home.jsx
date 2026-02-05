import { Hero } from "@/pages/home/sections/Hero";
import { useState } from "react";
import { Trending } from "./sections/Trending";
import { MovieCard } from "../../components/MovieCard";

export const Home = () => {

    return (
        <main className="">
            {/* Hero section */}
            <Hero />

            {/* trending section */}
            <Trending />
        </main>

    );
}