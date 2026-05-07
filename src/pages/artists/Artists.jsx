import { CustomSearch } from "@/components/Search";
import { useEffect, useState } from "react";
import { getAllArtists, getSearchArtist } from "../../services/apis";
import { CustomError } from "@/components/Error";
import { CustomLoading } from "@/components/Loading";
import { Link } from "react-router-dom";

// export const Artists = () => {

//     const [artist, setArtist] = useState([]);

//     //
//     const [error, setError] = useState(null);
//     const [loading, setLoading] = useState(true);

//     //
//     const [page, setPage] = useState(1);
//     const [totalPages, setTotalPages] = useState(1);

//     //
//     const [query, setQuery] = useState("");

//     //
//     const loadArtists = async () => {
//         setLoading(true);
//         setError(null);

//         try {

//             let jointData;

//             if (query) {
//                 jointData = await getSearchArtist(query, page);
//             } else {
//                 jointData = await getAllArtists(page);
//             }

//             setArtist(jointData.results);
//             setTotalPages(jointData.totalPages);

//         } catch (err) {
//             setError("Fail to load artists");
//         } finally {
//             setLoading(false);
//         }
//     }

//     //
//     useEffect(() => {
//         loadArtists();
//     }, [query, page]);
//     //search
//     const searchTv = async (searchQ) => {
//         setQuery(searchQ);
//         setPage(1);
//     }
//     return (
//         <div className="py-32 relative overflow-hidden">

//             {/* search */}
//             <CustomSearch onSearch={searchTv} />


//             <div className="container mx-auto px-4 md:px-1 lg:px-6">
//                 {/* HEADER */}
//                 <div className="gap-4 mb-6">
//                     <h1 className="text-2xl md:text-4xl font-bold">
//                         Artists
//                     </h1>

//                 </div>




//             </div>

//         </div>
//     );
// }


export const Artists = () => {

    const [artist, setArtist] = useState([]);

    //
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    //
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    //
    const [query, setQuery] = useState("");

    //
    const loadArtists = async () => {
        setLoading(true);
        setError(null);

        try {

            let jointData;

            if (query) {
                jointData = await getSearchArtist(query, page);
                console.log(jointData);
            } else {
                jointData = await getAllArtists(page);
            }

            setArtist(jointData.results);
            setTotalPages(jointData.totalPages);

        } catch (err) {
            setError("Fail to load artists");
        } finally {
            setLoading(false);
        }
    }

    //
    useEffect(() => {
        loadArtists();
    }, [query, page]);

    //search
    const searchTv = async (searchQ) => {
        setQuery(searchQ);
        setPage(1);
    }

    // if (loading) {
    //     return (
    //         <div className="flex justify-center items-center h-screen">
    //             <CustomLoading />
    //         </div>
    //     );
    // }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <CustomError text={error} onRetry={loadArtists} />
            </div>
        );
    }

    return (
        <div className="py-32 relative overflow-hidden">

            {/* search */}
            <CustomSearch onSearch={searchTv} />

            <div className="container mx-auto px-4 md:px-1 lg:px-6">

                {/* HEADER */}
                <div className="gap-4 mb-6">
                    <h1 className="text-2xl md:text-4xl font-bold">
                        Artists
                    </h1>
                </div>

                {/* Artists Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">

                    {loading ? <CustomLoading /> : artist.length === 0 ? (
                        <div className="col-span-full flex justify-center items-center py-20">
                            <p className="text-gray-400 text-lg">
                                Search not found
                            </p>
                        </div>
                    ) : artist.map((person) => {

                        const image = person.profile_path
                            ? `https://image.tmdb.org/t/p/w500${person.profile_path}`
                            : "https://placehold.co/500x750?text=No+Image";

                        const link = `/artists/${person.id}`;
                        return (
                            <Link key={person.id} to={link} className="group" >
                                <div className="bg-gray-900 rounded-2xl overflow-hidden hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1">

                                    {/* Artist Image */}
                                    <div className="relative overflow-hidden">

                                        <img
                                            src={image}
                                            alt={person.name}
                                            className="w-full h-72 object-cover group-hover:scale-105 transition duration-300"
                                        />

                                        {/* Department Badge */}
                                        <div className="absolute top-3 left-3 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-xs">
                                            {person.known_for_department}
                                        </div>

                                    </div>

                                    {/* Info */}
                                    <div className="p-4">

                                        {/* Name */}
                                        <h2 className="text-lg font-bold line-clamp-1">
                                            {person.name}
                                        </h2>

                                        {/* Popularity */}
                                        <p className="text-sm text-gray-400 mt-1">
                                            Popularity: {person.popularity?.toFixed(1)}
                                        </p>

                                        {/* Known For */}
                                        <div className="mt-4 flex flex-wrap gap-2">

                                            {person.known_for
                                                ?.slice(0, 3)
                                                .map((movie) => (

                                                    <span
                                                        key={movie.id}
                                                        className="text-xs bg-gray-800 px-2 py-1 rounded-full line-clamp-1"
                                                    >
                                                        {movie.title || movie.name}
                                                    </span>

                                                ))}

                                        </div>

                                    </div>

                                </div>
                            </Link>


                        );
                    })}

                </div>

                {/* Pagination */}


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

            </div>

        </div>
    );
}