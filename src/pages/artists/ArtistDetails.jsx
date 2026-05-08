import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import { getArtistDetails } from "../../services/apis";
import { CustomError } from "@/components/Error";
import { CustomLoading } from "@/components/Loading";
export const ArtistDetail = () => {

    const { id } = useParams();

    //
    const [artist, setArtist] = useState(null);

    //
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //
    const loadDetails = async () => {
        setLoading(true);

        try {
            const data = await getArtistDetails(id);
            setArtist(data);
        } catch (err) {
            console.log(err)
            setError("Fail to load details");
        } finally {
            setLoading(false);
        }
    }

    //
    useEffect(() => {
        loadDetails();
    }, [id]);

    //
    const image = artist?.profile_path
        ? `https://image.tmdb.org/t/p/w500${artist.profile_path}`
        : "https://placehold.co/500x750?text=No+Image";


    return (
        <div className="min-h-screen bg-black text-white pt-28 pb-20">

            {
                loading ? <CustomLoading /> : <div className="container mx-auto px-4 lg:px-6">

                    {/* TOP SECTION */}
                    <div className="grid lg:grid-cols-3 gap-10">

                        {/* LEFT IMAGE */}
                        <div>

                            <img
                                src={image}
                                alt={artist?.name}
                                className="w-full rounded-3xl object-cover shadow-2xl"
                            />

                        </div>

                        {/* RIGHT INFO */}
                        <div className="lg:col-span-2">

                            {/* NAME */}
                            <h1 className="text-4xl md:text-5xl font-bold">
                                {artist?.name}
                            </h1>

                            {/* AKA */}
                            {artist?.also_known_as?.length > 0 && (
                                <p className="text-gray-400 mt-2">
                                    Also known as: {artist.also_known_as.join(", ")}
                                </p>
                            )}

                            {/* STATS */}
                            <div className="flex flex-wrap gap-3 mt-6">

                                <div className="bg-gray-900 px-4 py-2 rounded-full text-sm">
                                    🎭 {artist?.known_for_department}
                                </div>

                                <div className="bg-gray-900 px-4 py-2 rounded-full text-sm">
                                    ⭐ Popularity: {artist?.popularity?.toFixed(1)}
                                </div>

                                <div className="bg-gray-900 px-4 py-2 rounded-full text-sm">
                                    🎂 {artist?.birthday}
                                </div>

                                <div className="bg-gray-900 px-4 py-2 rounded-full text-sm">
                                    📍 {artist?.place_of_birth}
                                </div>

                            </div>

                            {/* BIO */}
                            <div className="mt-10">
                                <h2 className="text-2xl font-semibold mb-4">
                                    Biography
                                </h2>
                                <p className="text-gray-300 leading-8 whitespace-pre-line">
                                    {artist?.biography || "No biography available."}
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* FILMOGRAPHY */}
                    <div className="mt-20">

                        <div className="flex items-center justify-between mb-6">

                            <h2 className="text-2xl md:text-3xl font-bold">
                                Filmography
                            </h2>

                            <span className="text-gray-400 text-sm">
                                {artist?.cast?.length} Titles
                            </span>

                        </div>

                        {/* MOVIES GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5">

                            {artist?.cast?.map((movie) => {

                                const poster = movie.poster_path
                                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                    : "https://placehold.co/500x750?text=No+Image";

                                const link = movie.media_type === "movie" ? `/movies/${movie.id}` : `/tv-series/${movie.id}`

                                return (

                                    <Link key={movie.id} to={link}>
                                        <div
                                            key={movie.id}
                                            className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 group"
                                        >

                                            {/* POSTER */}
                                            <div className="overflow-hidden">

                                                <img
                                                    src={poster}
                                                    alt={movie.title}
                                                    className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
                                                />

                                            </div>

                                            {/* CONTENT */}
                                            <div className="p-4">

                                                {/* TITLE */}
                                                <h3 className="font-semibold line-clamp-1">
                                                    {movie.title}
                                                </h3>

                                                {/* CHARACTER */}
                                                <p className="text-sm text-gray-400 mt-1 line-clamp-1">
                                                    as {movie.character}
                                                </p>

                                                {/* YEAR */}
                                                <p className="text-sm text-gray-500 mt-2">
                                                    {movie.release_date?.split("-")[0]}
                                                </p>

                                                {/* RATING */}
                                                <div className="mt-3 flex items-center justify-between">

                                                    <span className="text-yellow-400 text-sm">
                                                        ⭐ {movie.vote_average}
                                                    </span>

                                                    <span className="text-xs bg-gray-800 px-2 py-1 rounded-full">
                                                        {movie.media_type}
                                                    </span>

                                                </div>

                                            </div>

                                        </div>
                                    </Link>


                                );
                            })}

                        </div>

                    </div>

                </div>
            }

        </div>
    )
}