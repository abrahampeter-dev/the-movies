import { MovieCard } from "@/components/MovieCard";
import { Tabs } from "@/components/Tabs";

export const Popular = () => {
    const tabItems = [
        {
            id: "mv",
            title: "Movies",
            content: <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll py-4">
                {
                    [...Array(20)].map((_, ind) => (
                        <MovieCard key={ind} image="/pggg.jpeg" title="Peaky Blinder" year="2013" showFav={false} />
                    ))
                }
            </div>
        },
        {
            id: "tv",
            title: "TV Series",
            content: <div className="flex gap-2 lg:gap-4 overflow-x-auto scroll-smooth firefox-scroll py-4">
                {
                    [...Array(20)].map((_, ind) => (
                        <MovieCard key={ind} image="/pggg2.jpeg" title="The Wrecking Crew hhhhhhh" year="2013" showFav={false} type="TV" />
                    ))
                }
            </div>
        },
    ];
    return (
        <section className="py-12 relative overflow-hidden">
            <div className="container mx-auto px-1 lg:px-6">
                <Tabs
                    title="What's Popular"
                    items={tabItems}
                    defaultTab="mv"

                />
            </div>

        </section>
    );

}