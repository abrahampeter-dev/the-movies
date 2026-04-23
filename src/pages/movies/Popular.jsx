import { useEffect, useState } from "react";
import { MovieCard } from "@/components/MovieCard";
import { Search } from "@/components/Search";
import { getPopularMovies } from "@/services/apis";

export const Popular = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {

        const loadMovies = async () => {
            setLoading(true);
            try {
                const pMovies = await getPopularMovies(page);
                setMovies(pMovies.results);
                setTotalPages(pMovies.totalPages);
            } catch (err) {
                console.log(err)
                setError("Fail to load popular movies");
            } finally {
                setLoading(false);
            }
        }

        loadMovies(page);
    }, [page]);

    return (
        <div className="py-32 relative overflow-hidden">
            <Search />
            {error && <div className="error-message">{error}</div>}
            <div className="container mx-auto px-1 lg:px-6">
                {
                    loading ? (
                        <div className="flex flex-col justify-center items-center h-40 gap-3">
                            <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
                            <p className="text-gray-600 text-sm">Loading movies...</p>
                        </div>
                    )

                        :
                        (
                            <>
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
                                </div>

                                {/* pagination */}
                                <div className="flex justify-center items-center gap-2 py-6">
                                    <button onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                        disabled={page === 1}
                                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    >Prev</button>
                                    <span className="text-sm">page {page} of {totalPages}</span>
                                    <button onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                                        disabled={page === totalPages}
                                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                                    >Next</button>
                                </div>
                            </>
                        )
                }

            </div>
        </div>
    );
}