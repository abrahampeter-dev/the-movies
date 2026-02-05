import { Hero } from "@/pages/home/sections/Hero";
import { useState } from "react";
import { Trending } from "./sections/Trending";
import { Popular } from "./sections/Popular";

export const Home = () => {

    return (
        <main className="">
            {/* Hero section */}
            <Hero />

            {/* trending section */}
            <Trending />

            {/* Popular Section */}
            <Popular />
        </main>

    );
}