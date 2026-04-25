import { useEffect, useState } from "react";
import { MovieCard } from "@/components/MovieCard";
import { Search } from "@/components/Search";
import { getPopularMovies, getSearchMovie } from "@/services/apis";
import { CustomError, Error } from "../../components/Error";
import { CustomSearch } from "../../components/Search";


export const Popular = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    //
    const [query, setQuery] = useState("");

    //load movies
    const loadMovies = async () => {
        setLoading(true);
        setError(null);
        try {

            let pMovies;

            if (query) {
                //search
                pMovies = await getSearchMovie(query, page);
            } else {
                //normal data
                pMovies = await getPopularMovies(page);
            }

            setMovies(pMovies.results);
            setTotalPages(pMovies.totalPages);
        } catch (err) {
            console.log(err)
            setError("Fail to load movies");
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        loadMovies();
    }, [page, query]);

    //search function
    const searchMovie = async (searchQ) => {
        // e.preventDefault();
        setQuery(searchQ);
        setPage(1)
    }

    return (
        <div className="py-32 relative overflow-hidden">
            <CustomSearch onSearch={searchMovie} />
            <div className="container mx-auto px-4 md:px-1 lg:px-6">
                {/* HEADER */}
                <div className="gap-4 mb-6">
                    <h1 className="text-2xl md:text-4xl font-bold">
                        Movies
                    </h1>

                </div>

                {error && !loading && <CustomError text={error} onRetry={loadMovies} />}

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
                                                rate={movie.vote_average}
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
                                        className="px-8 py-2 text-white bg-muted-foreground rounded disabled:opacity-50"
                                    >Prev</button>
                                    <span className="text-sm">Page {page} of {totalPages}</span>
                                    <button onClick={() => setPage((p) => (p < totalPages ? p + 1 : p))}
                                        disabled={page === totalPages}
                                        className="px-8 py-2 bg-primary-foreground text-primary rounded disabled:opacity-50"
                                    >Next</button>
                                </div>
                            </>
                        )
                }

            </div>
        </div>
    );
}