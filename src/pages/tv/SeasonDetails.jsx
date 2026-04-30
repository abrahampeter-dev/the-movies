import { useNavigate, useParams } from "react-router-dom"
import { getTvSeasonDetails } from "../../services/apis";
import { useEffect, useState } from "react";
import { CustomError } from "../../components/Error";
import { CustomLoading } from "../../components/Loading";

export const SeasonDetails = () => {

    const { id, season_number } = useParams();

    //
    const [season, setSeason] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //
    const navigate = useNavigate();

    //
    const loadSeasonDetails = async () => {
        setLoading(true);

        try {
            const data = await getTvSeasonDetails(id, season_number);
            setSeason(data);

            console.log('dd', data);

        } catch (err) {
            console.log(err)
            setError("Fail to load details");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadSeasonDetails();
    }, [id, season_number]);


    //
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CustomLoading />
                {/* <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div> */}
            </div>
        );
    }

    if (!season) return (
        <div className="flex justify-center items-center h-screen">
            <CustomError text="No Data" onRetry={loadSeasonDetails} />
        </div>
    );
    return (
        <div className="py-32 px-5 md:px-50 mx-auto relative overflow-hidden">

            {/* HERO SECTION */}
            <div className="flex flex-col md:flex-row gap-6">
                <img
                    src={`https://image.tmdb.org/t/p/w500${season.poster_path}`}
                    className="w-48 rounded-xl"
                />

                <div>
                    <h1 className="text-3xl font-bold">{season.name}</h1>
                    <p className="text-gray-400 mt-2">
                        ⭐ {season.vote_average} • {season.episodes.length} Episodes
                    </p>

                    <p className="mt-4 text-sm text-gray-300 max-w-2xl">
                        {season.overview}
                    </p>
                </div>
            </div>

            {/* EPISODES */}
            <div className="mt-10">
                <h2 className="text-2xl font-semibold mb-4">Episodes</h2>

                <div className="space-y-6">
                    {season.episodes.map((ep) => (
                        <div
                            key={ep.id}
                            onClick={() => navigate(`/tv-series/${id}/season/${season_number}/episode/${ep.episode_number}`)}
                            className="flex flex-col md:flex-row gap-4 bg-gray-900 p-4 rounded-xl hover:bg-gray-800 transition"
                        >
                            {/* Episode Image */}
                            <img
                                src={
                                    ep.still_path
                                        ? `https://image.tmdb.org/t/p/w300${ep.still_path}`
                                        : season.poster_path
                                            ? `https://image.tmdb.org/t/p/w300${season.poster_path}`
                                            : "/no-image.png"
                                }
                                className="w-full md:w-40 h-48 md:h-24 object-cover rounded-lg"
                            />

                            {/* Episode Info */}
                            <div className="flex-1">
                                <div className="flex justify-between">
                                    <h3 className="font-semibold">
                                        {ep.episode_number}. {ep.name}
                                    </h3>

                                    <span className="text-sm text-gray-400">
                                        {ep.runtime}m
                                    </span>
                                </div>

                                <p className="text-sm text-gray-400 mt-1">
                                    ⭐ {ep.vote_average}
                                </p>

                                <p className="text-sm mt-2 text-gray-300 line-clamp-3">
                                    {ep.overview}
                                </p>

                                <p className="text-xs text-gray-500 mt-2">
                                    Air date: {ep.air_date}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}