import { useParams } from "react-router-dom"
import { getTvEpisodeDetails } from "../../services/apis";
import { useEffect, useState } from "react";
import { CustomError } from "../../components/Error";
import { CustomLoading } from "../../components/Loading";

export const EpisodeDetails = () => {

    const { id, season_number, episode_number } = useParams();

    //
    const [episode, setEpisode] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    //
    const loadEpisodeDetails = async () => {
        setLoading(true);

        try {
            const data = await getTvEpisodeDetails(id, season_number, episode_number);
            setEpisode(data);

            console.log('dd', data);

        } catch (err) {
            console.log(err)
            setError("Fail to load details");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadEpisodeDetails();
    }, [id, season_number, episode_number]);


    //
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CustomLoading />
                {/* <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div> */}
            </div>
        );
    }

    if (!episode) return (
        <div className="flex justify-center items-center h-screen">
            <CustomError text="No Data" onRetry={loadEpisodeDetails} />
        </div>
    );
    return (
        <div className="py-32 px-5 md:px-50 mx-auto relative overflow-hidden">

            {/* HERO SECTION */}
            <div className="flex flex-col md:flex-row gap-6">

                {/* Episode Image */}
                <img
                    src={
                        episode.still_path
                            ? `https://image.tmdb.org/t/p/w500${episode.still_path}`
                            : "/no-image.png"
                    }
                    className="w-full md:w-80 h-56 md:h-44 object-cover rounded-xl"
                />

                {/* Episode Info */}
                <div>
                    <h1 className="text-3xl font-bold">
                        {episode.episode_number}. {episode.name}
                    </h1>

                    <p className="text-gray-400 mt-2">
                        ⭐ {episode.vote_average} • {episode.runtime}m
                    </p>

                    <p className="text-gray-500 text-sm mt-1">
                        Air date: {episode.air_date}
                    </p>

                    <p className="mt-4 text-sm text-gray-300 max-w-2xl">
                        {episode.overview}
                    </p>
                </div>
            </div>

            {/* CAST SECTION */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Cast</h2>

                <div className="flex gap-4 overflow-x-auto scroll-smooth firefox-scroll space-y-4 pb-2">
                    {episode.guest_stars.map((actor) => (
                        <div
                            key={actor.id}
                            className="min-w-25 text-center"
                        >
                            <img
                                src={
                                    actor.profile_path
                                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                        : "/no-image.png"
                                }
                                className="w-24 h-24 object-cover rounded-full mx-auto"
                            />

                            <p className="text-sm mt-2 font-medium">
                                {actor.name}
                            </p>

                            <p className="text-xs text-gray-400">
                                {actor.character}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CREW SECTION */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Crew</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {episode.crew.map((person) => (
                        <div
                            key={person.credit_id}
                            className="bg-gray-900 p-3 rounded-lg"
                        >
                            <p className="font-medium">{person.name}</p>
                            <p className="text-xs text-gray-400">
                                {person.job}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

        </div>

    )
}