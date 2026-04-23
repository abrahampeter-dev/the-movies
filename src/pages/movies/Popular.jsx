import { useEffect, useState } from "react";
import { MovieCard } from "@/components/MovieCard";
import { Search } from "@/components/Search";
import { getPopularMovies } from "@/services/apis";

export const Popular = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadMovies = async () => {
            try {
                const pMovies = await getPopularMovies();
                setMovies(pMovies);
            } catch (err) {
                console.log(err)
                setError("Fail to load popular movies");
            } finally {
                setLoading(false);
            }
        }

        loadMovies();
    }, []);

    return (
        <div className="py-32 relative overflow-hidden">
            <Search />
            {error && <div className="error-message">{error}</div>}
            <div className="container mx-auto px-1 lg:px-6">
                {
                    loading ?
                        <div className="flex flex-col justify-center items-center h-40 gap-3">
                            <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                            <p className="text-gray-600 text-sm">Loading movies...</p>
                        </div>
                        :
                        <div className="grid md:grid-cols-6 grid-cols-2 gap-4 py-4">
                            {
                                movies.map((movie) => (
                                    <MovieCard
                                        key={movie.id}
                                        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        title={movie.title} year={movie.release_date}
                                        showFav={false}
                                        id={movie.id}

                                        to={({ id }) => `/movies/${id}`}

                                    />
                                ))
                            }
                        </div>}

            </div>
        </div>
    );
}