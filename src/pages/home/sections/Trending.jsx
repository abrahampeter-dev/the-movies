import { Tabs } from "@/components/Tabs";
import { MovieCard } from "../../../components/MovieCard";

export const Trending = () => {

    const tabItems = [
        {
            id: "today",
            title: "Today",
            content: <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll py-4">
                {
                    [...Array(20)].map((_, ind) => (
                        <MovieCard key={ind} image="/pggg.jpeg" title="Peaky Blinder" year="2013" showFav={false} />
                    ))
                }
            </div>
        },
        {
            id: "week",
            title: "This Week",
            content: <div>Hello, What's Trending This Week</div>,
        },
    ];
    return (
        <section className="py-12 relative overflow-hidden">
            <div className="container mx-auto px-6">
                <Tabs
                    title="What's Trending"
                    items={tabItems}
                    defaultTab="today"

                />
            </div>

        </section>
    );
}