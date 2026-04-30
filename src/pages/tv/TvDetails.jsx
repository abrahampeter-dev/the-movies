import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { getTvDetails } from "../../services/apis";
import { MovieCard } from "@/components/MovieCard";


export const TvDetails = () => {

    const { id } = useParams();

    //
    const [tv, setTv] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //
    const navigate = useNavigate();

    //
    const loadDetails = async () => {
        setLoading(true);

        try {
            const data = await getTvDetails(id);

            setTv(data);

        } catch (err) {
            console.log(err)
            setError("Fail to load details");
        } finally {
            setLoading(false);
        }
    }

    const handleClick = () => {
        // if
    }

    useEffect(() => {
        loadDetails();
    }, [id]);


    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!tv) return <p>No data</p>;

    const backdrop = `https://image.tmdb.org/t/p/original${tv.backdrop_path}`;
    const poster = `https://image.tmdb.org/t/p/w500${tv.poster_path}`;


    return (
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
                        alt={tv.name}
                        className="w-40 md:w-56 rounded-xl shadow-xl"
                    />

                    {/* Info */}
                    <div className="text-center md:text-left max-w-2xl">

                        <h1 className="text-3xl md:text-5xl font-bold">
                            {tv.name}
                        </h1>

                        <p className="text-gray-300 mt-2 italic text-sm md:text-base">
                            {tv.tagline || " "}
                        </p>

                        {/* Genres */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-2 mt-3">
                            {tv.genres?.map((g) => (
                                <span key={g.id} className="bg-primary/80 px-2 py-1 text-xs rounded-full">
                                    {g.name}
                                </span>
                            ))}
                        </div>

                        {/* Meta */}
                        <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3 text-sm text-gray-300">
                            <span>⭐ {tv.vote_average?.toFixed(1)}</span>
                            <span>{tv.vote_count} votes</span>
                            <span>{tv.number_of_seasons} Seasons</span>
                            <span>{new Date(tv.first_air_date).getFullYear()}</span>
                        </div>

                        {/* Overview preview */}
                        <p className="mt-4 text-gray-300 text-sm md:text-base leading-relaxed line-clamp-4">
                            {tv.overview}
                        </p>

                    </div>
                </div>
            </div>

            {/* DETAILS */}
            <div className="container mx-auto px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">

                {/* Overview */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-semibold text-white mb-3">
                        Overview
                    </h2>
                    <p className="leading-relaxed text-sm md:text-base">
                        {tv.overview}
                    </p>
                </div>

                {/* Side info */}
                <div className="space-y-3 text-xs md:text-sm bg-white/5 p-4 rounded-lg">

                    <p><strong>Status:</strong> {tv.status}</p>
                    <p><strong>First Air:</strong> {tv.first_air_date}</p>
                    <p><strong>Last Air:</strong> {tv.last_air_date}</p>

                    <p><strong>Seasons:</strong> {tv.number_of_seasons}</p>
                    <p><strong>Episodes:</strong> {tv.number_of_episodes}</p>

                    <p>
                        <strong>Language:</strong>{" "}
                        {tv.spoken_languages?.map(l => l.english_name).join(", ")}
                    </p>

                    <p>
                        <strong>Country:</strong>{" "}
                        {tv.production_countries?.map(c => c.name).join(", ")}
                    </p>

                </div>
            </div>

            {/* NEXT EPISODE */}
            {tv.next_episode_to_air && (
                <Section title="Next Episode">
                    <div className="bg-white/5 p-4 rounded-lg max-w-xl">
                        <p className="font-semibold">{tv.next_episode_to_air.name}</p>
                        <p className="text-xs text-gray-400">
                            Air Date: {tv.next_episode_to_air.air_date}
                        </p>
                        <p className="text-sm mt-2">
                            {tv.next_episode_to_air.overview}
                        </p>
                    </div>
                </Section>
            )}

            {/* SEASONS */}
            <Section title="Seasons">
                <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll space-y-4 pb-2">
                    {tv.seasons?.map((season) => (
                        <div onClick={() => navigate(`/tv-series/${tv.id}/season/${season.season_number}`)} key={season.id} className="min-w-32 text-center cursor-pointer">

                            <img
                                src={`https://image.tmdb.org/t/p/w300${season.poster_path}`}
                                className="w-full h-44 object-cover rounded-lg"
                            />

                            <p className="text-sm mt-2">{season.name}</p>
                            <p className="text-xs text-gray-400">
                                {season.episode_count} eps
                            </p>

                        </div>
                    ))}
                </div>
            </Section>

            {/* CAST */}
            <Section title="Cast">
                <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll space-y-4 pb-2">
                    {tv.cast?.map((actor) => (
                        <div key={actor.id} className="min-w-28 text-center">

                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                                        : "https://via.placeholder.com/200"
                                }
                                className="w-full h-32 object-cover rounded-lg"
                            />

                            <p className="text-xs mt-2">{actor.name}</p>
                            <p className="text-[10px] text-gray-400">
                                {actor.character}
                            </p>

                        </div>
                    ))}
                </div>
            </Section>

            {/* TRAILER */}
            {tv.videos?.length > 0 && (
                <Section title="Trailer">
                    <div className="max-w-3xl mx-auto h-50 md:h-87.5">
                        <iframe
                            className="w-full h-full rounded-xl shadow-lg"
                            src={`https://www.youtube.com/embed/${tv.videos[0].key}`}
                            allowFullScreen
                            title="Trailer"
                        />
                    </div>
                </Section>
            )}

            {/*  REVIEWS  */}
            <Section title="Reviews">
                <div className="max-h-100 overflow-y-auto scroll-smooth firefox-scroll space-y-4 pr-2">
                    {tv.reviews?.slice(0, 5).map((review) => (
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
            {/* SIMILAR SERIES */}
            <Section title="Similar Series">
                <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll space-y-4 pb-2">
                    {tv.similar?.slice(0, 10).map((m) => (
                        <div key={m.id} className="min-w-35">
                            <MovieCard
                                image={`https://image.tmdb.org/t/p/w500${m.poster_path}`}
                                title={m.name}
                                year={m.first_air_date}
                                rate={m.vote_average}
                                id={m.id}
                                showFav={false}
                                to={({ id }) => `/tv/${id}`}
                            />
                        </div>
                    ))}
                </div>
            </Section>

            {/* NETWORKS */}
            <div className="container mx-auto px-4 md:px-6 py-10">
                <h2 className="text-xl font-semibold mb-4">Networks</h2>

                <div className="flex flex-wrap gap-4">
                    {tv.networks?.map((n) => (
                        <div key={n.id} className="flex items-center gap-2">

                            {n.logo_path && (
                                <img
                                    src={`https://image.tmdb.org/t/p/w200${n.logo_path}`}
                                    className="h-6 object-contain"
                                />
                            )}

                            <span className="text-sm text-gray-300">
                                {n.name}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};


/* REUSABLE SECTION */
const Section = ({ title, children }) => (
    <div className="container mx-auto px-4 md:px-6 py-10">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        {children}
    </div>
);