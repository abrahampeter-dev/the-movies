import { useEffect, useState } from "react";
import { MovieCard } from "@/components/MovieCard";
import { Search } from "@/components/Search";
import { getPopularMovies, getSearchMovie } from "@/services/apis";
import { getTopRatedMovies } from "../../services/apis";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
export const Toprated = () => {

    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    //
    const [query, setQuery] = useState("");

    const loadMovies = async () => {
        setLoading(true);
        setError(null);

        try {
            let topMovies;

            if (query) {
                topMovies = await getSearchMovie(query, page);
            } else {
                topMovies = await getTopRatedMovies(page);
            }

            setMovies(topMovies.results);
            setTotalPages(topMovies.totalPages);

        } catch (err) {
            console.log(err);
            setError("Failed to load movies");
        } finally {
            setLoading(false);
        }
    };

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
            <Search onSearch={searchMovie} />
            <div className="container mx-auto px-4 md:px-1 lg:px-6">

                {/* HEADER */}
                <div className="gap-4 mb-6">
                    <h1 className="text-2xl md:text-4xl font-bold">
                        Top Rated Movies
                    </h1>

                </div>

                {/* error */}
                {error && !loading && <Error text={error} onRetry={loadMovies} />}

                {
                    loading ?
                        <Loading text="Loading top rated movies..." />
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
    )
}