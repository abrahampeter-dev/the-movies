import { MovieCard } from "../../components/MovieCard";
import { Search } from "../../components/Search";

export const Popular = () => {
    return (
        <div className="py-32 relative overflow-hidden">
            <Search />
            <div className="container mx-auto px-1 lg:px-6">
                <div className="grid md:grid-cols-6 grid-cols-2 gap-4 py-4">
                    {
                        [...Array(20)].map((_, ind) => (
                            <MovieCard key={ind} image="/pggg.jpeg" title="Peaky Blinder" year="2013" showFav={false} />
                        ))
                    }
                </div>
            </div>

        </div>
    );
}