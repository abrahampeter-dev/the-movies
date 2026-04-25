import { useEffect, useState } from "react";
import { MovieCard } from "@/components/MovieCard";
import { getUpcomingMovies } from "@/services/apis";
import { Loading } from "@/components/Loading";
import { Error } from "../../components/Error";

export const UpcomingMovie = () => {
    const [movies, setMovies] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    //today
    const today = new Date().toISOString().split("T")[0];

    //
    const [range, setRange] = useState({
        from: today,
        to: "",
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    //
    const loadMovies = async () => {
        setLoading(true);
        setError(null);
        try {

            const data = await getUpcomingMovies(page);

            setMovies(data.results);
            setTotalPages(data.totalPages);

            // setRange({
            //     from: today,
            //     to: data.dates?.maximum || "",
            // });

            console.log(data);
        } catch (err) {
            console.log(err)
            setError("Fail to load upcoming movies");

        } finally {
            setLoading(false);
        }

        setLoading(false);
    };


    useEffect(() => {
        loadMovies();
    }, [page]);

    //  FILTER CURRENT PAGE ONLY 
    const filteredMovies = movies.filter((movie) => {
        if (!range.from || !range.to) return true;

        return (
            movie.release_date >= range.from &&
            movie.release_date <= range.to
        );
    });


    return (
        <div className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-1 lg:px-6">
                {/* HEADER */}
                <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">

                    <h1 className="text-2xl md:text-4xl font-bold">
                        Upcoming Movies
                    </h1>

                    {/* DATE FILTER */}
                    <div className="flex gap-3 text-sm">

                        <div>
                            <label className="text-xs md:text-sm font-bold text-gray-400 px-1">From</label>
                            <input
                                type="date"
                                value={range.from}
                                min={today}
                                onChange={(e) =>
                                    setRange((p) => ({ ...p, from: e.target.value }))
                                }
                                className="bg-white/10 px-2 py-1 rounded"
                            />
                        </div>

                        <div>
                            <label className="text-xs md:text-sm font-bold text-gray-400 px-1">To</label>
                            <input
                                type="date"
                                value={range.to}
                                min={range.from || today}
                                onChange={(e) =>
                                    setRange((p) => ({ ...p, to: e.target.value }))
                                }
                                className="bg-white/10 px-2 py-1 rounded"
                            />
                        </div>

                    </div>
                </div>
                {/* error */}
                {error && !loading && <Error text={error} onRetry={loadMovies} />}

                {/* LOADING */}
                {loading ? <Loading text="Loading upcoming movies..." /> : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">

                            {filteredMovies.map((movie) => (
                                <MovieCard
                                    key={movie.id}
                                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    title={movie.title}
                                    year={movie.release_date}
                                    id={movie.id}
                                    to={({ id }) => `/movies/${id}`}
                                    showFav={false}
                                />
                            ))}

                        </div>

                        {/* EMPTY STATE */}
                        {filteredMovies.length === 0 && (
                            <div className="text-center text-gray-400 mt-10">
                                No movies found in this range
                            </div>
                        )}

                        {/* PAGINATION */}
                        <div className="flex justify-center items-center gap-4 mt-10">

                            <button
                                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                                disabled={page === 1}
                                className="px-4 py-2 bg-white/10 rounded disabled:opacity-40"
                            >
                                Prev
                            </button>

                            <span className="text-sm text-gray-300">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                onClick={() =>
                                    setPage((p) => Math.min(p + 1, totalPages))
                                }
                                disabled={page === totalPages}
                                className="px-4 py-2 bg-white/10 rounded disabled:opacity-40"
                            >
                                Next
                            </button>

                        </div>
                    </>
                )}
            </div>

        </div >
    );
};