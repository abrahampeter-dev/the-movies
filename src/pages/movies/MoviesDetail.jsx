import { IdCardIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieDetails } from "@/services/apis";
import { MovieCard } from "@/components/MovieCard";


export const MovieDetails = () => {

    const { id } = useParams();

    const [movie, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadDetails = async () => {
            setLoading(true);

            try {
                const data = await getMovieDetails(id);
                console.log("details", data);

                setMovies(data);
            } catch (err) {
                console.log(err)
                setError("Fail to load details");
            } finally {
                setLoading(false);
            }
        }
        loadDetails();
    }, [id]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!movie) return <p>No data</p>;

    const backdrop = `https://image.tmdb.org/t/p/original${movie.backdrop_path}`;
    const poster = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        // <div className="py-32 relative overflow-hidden">

        <div className="text-white bg-black">

            {/* HERO */}
            <div
                className="relative min-h-[60vh] md:min-h-[75vh] bg-cover bg-center"
                style={{ backgroundImage: `url(${backdrop})` }}
            >
                <div className="absolute inset-0 bg-linear-to-r from-black via-black/70 to-black/40" />

                <div className="relative z-10 container mx-auto px-4 md:px-6 py-16 flex flex-col md:flex-row items-center md:items-end gap-6">

                    {/* Poster */}
                    <img
                        src={poster}
                        alt={movie.title}
                        className="w-40 md:w-56 rounded-xl shadow-xl"
                    />

                    {/* Info */}
                    <div className="text-center md:text-left max-w-2xl">

                        <h1 className="text-3xl md:text-5xl font-bold">
                            {movie.title}
                        </h1>

                        <p className="text-gray-300 mt-2 italic text-sm md:text-base">
                            {movie.tagline}
                        </p>

                        {/* Genres */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                            {movie.genres?.map((g) => (
                                <span
                                    key={g.id}
                                    className="bg-primary/80 px-2 py-1 text-xs rounded-full"
                                >
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-300">
                            <span>⭐ {movie.vote_average}</span>
                            <span>{movie.vote_count} votes</span>
                            <span>{movie.runtime} min</span>
                            <span>{new Date(movie.release_date).getFullYear()}</span>
                        </div>

                        {/* Overview preview */}
                        <p className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed line-clamp-4">
                            {movie.overview}
                        </p>

                    </div>
                </div>
            </div>

            {/*  DETAILS  */}
            <div className="container mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">

                {/* Overview */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold text-white mb-3">
                        Overview
                    </h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        {movie.overview}
                    </p>
                </div>

                {/* Side info */}
                <div className="space-y-3 text-xs md:text-sm bg-white/5 p-4 rounded-lg">

                    <p><strong>Status:</strong> {movie.status}</p>
                    <p><strong>Release:</strong> {movie.release_date}</p>
                    <p><strong>Budget:</strong> ${movie.budget?.toLocaleString()}</p>
                    <p><strong>Revenue:</strong> ${movie.revenue?.toLocaleString()}</p>

                    <p>
                        <strong>Language:</strong>{" "}
                        {movie.spoken_languages?.map(l => l.english_name).join(", ")}
                    </p>

                    <p>
                        <strong>Country:</strong>{" "}
                        {movie.production_countries?.map(c => c.name).join(", ")}
                    </p>

                </div>
            </div>

            {/*  CAST  */}
            <Section title="Cast">
                <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll pb-2">
                    {movie.cast?.map((actor) => (
                        <div key={actor.id} className="min-w-27.5 text-center">

                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : "https://via.placeholder.com/200"
                                }
                                className="w-full h-32 md:h-40 object-cover rounded-lg"
                            />

                            <p className="text-xs md:text-sm mt-2">
                                {actor.name}
                            </p>

                            <p className="text-[10px] text-gray-400">
                                {actor.character}
                            </p>

                        </div>
                    ))}
                </div>
            </Section>

            {/*  TRAILER  */}
            {movie.videos?.length > 0 && (
                <Section title="Trailer">
                    <div className="max-w-3xl mx-auto h-50 md:h-87.5">
                        <iframe
                            className="w-full h-full rounded-xl shadow-lg"
                            src={`https://www.youtube.com/embed/${movie.videos[0].key}`}
                            allowFullScreen
                            title="Trailer"
                        />
                    </div>
                </Section>
            )}

            {/*  REVIEWS  */}
            <Section title="Reviews">
                <div className="max-h-100 overflow-y-auto scroll-smooth firefox-scroll space-y-4 pr-2">
                    {movie.reviews?.slice(0, 5).map((review) => (
                        <div key={review.id} className="bg-white/5 p-4 rounded-lg">

                            <p className="text-sm text-gray-300 line-clamp-4">
                                {review.content}
                            </p>

                            <p className="text-xs text-gray-500 mt-2">
                                — {review.author}
                            </p>

                        </div>
                    ))}
                </div>
            </Section>

            {/*  SIMILAR  */}
            <Section title="Similar Movies">
                <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll pb-2">
                    {movie.similar?.slice(0, 10).map((m) => (
                        <div key={m.id} className="min-w-35">

                            <MovieCard
                                image={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                title={m.title}
                                year={m.release_date}
                                id={m.id}
                                showFav={false}
                                to={({ id }) => `/movies/${id}`}
                            />

                        </div>
                    ))}
                </div>
            </Section>

            {/*  PRODUCTION  */}
            <div className="container mx-auto px-4 md:px-6 py-10">

                <h2 className="text-xl font-semibold mb-4">
                    Production
                </h2>

                <div className="flex flex-wrap gap-4">
                    {movie.production_companies?.map((company) => (
                        <div key={company.id} className="flex items-center gap-2">

                            {company.logo_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${company.logo_path}`}
                                    className="h-6 md:h-8 object-contain"
                                />
                            )}

                            <span className="text-xs md:text-sm text-gray-300">
                                {company.name}
                            </span>

                        </div>
                    ))}
                </div>

            </div>

            {/*  HOMEPAGE  */}
            {movie.homepage && (
                <div className="container mx-auto px-4 md:px-6 pb-10">
                    <a
                        href={movie.homepage}
                        target="_blank"
                        className="inline-block bg-primary px-4 py-2 rounded text-sm"
                    >
                        Visit Official Site
                    </a>
                </div>
            )}

        </div>
    );
};

/*  REUSABLE SECTION  */
const Section = ({ title, children }) => (
    <div className="container mx-auto px-4 md:px-6 py-10">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
    </div>
);



