import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const MovieCard = ({ image, title, year, type = "MV", onFavorite, showFav = true, display = "picture", id, to, rate }) => {
    const formattedDate = new Date(year).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });

    const navigate = useNavigate();

    const handleClick = () => {
        if (!to) return;

        if (typeof to == "function") {
            navigate(to({ id, title, year }));
            return;
        }

        navigate(to.replace(":id", id));
    }

    return (

        <div onClick={handleClick} className="cursor-pointer">
            {
                display === "picture" ? (
                    <div className="relative max-w-md mx-auto">
                        <div className="group relative shrink-0 w-37.5 md:w-50 rounded-lg glass">

                            {/* image wrapper handles clipping */}
                            <div className="rounded-lg h-65">
                                <img
                                    src={image}
                                    alt="img"
                                    className="w-full h-full object-cover aspect-4/5 rounded-t-xl"
                                />

                            </div>

                            {/* topleft */}
                            <div className="absolute -bottom-2.5 left-1 glass bg-primary-foreground/20 rounded-full px-3 py-2">
                                <span className="text-[10px] font-bold text-foreground">
                                    {type}
                                </span>
                            </div>
                            <div className="absolute bottom-0 left-1 px-3 py-2">
                                <span className="text-[10px] font-extrabold text-primary">
                                    {rate?.toFixed(1)}
                                </span>
                            </div>




                            {/* topRight */}

                            {
                                showFav && (
                                    <div className="absolute top-0 right-0 opacity-100 md:opacity-0 scale-90 md:group-hover:opacity-100 md:group-hover:scale-100 transition-all duration-200 ease-out rounded-full glass bg-primary-foreground/20 px-3 py-1">
                                        <button className="rounded-full text-3xl"> ♥</button>
                                    </div>
                                )
                            }
                        </div>

                        {/* text below */}
                        <div className="px-3 py-4 h-25 flex flex-col justify-end">
                            <h3 className="text-sm lg:text-md font-semibold leading-tight line-clamp-2 mb-1">
                                {title}
                            </h3>
                            <p className="text-xs lg:text-sm text-muted-foreground">
                                {formattedDate}
                            </p>
                        </div>
                    </div>


                ) : (

                    <div className="relative shrink-0 w-72 md:w-96 lg:w-md">
                        <div className="group relative rounded-xl glass overflow-hidden">

                            {/* image */}
                            <div className="relative w-full aspect-video">
                                <img
                                    src={image}
                                    alt={title}
                                    className="inset-0 w-full h-full object-fill"
                                />
                            </div>

                            {/* type badge */}
                            <div className="absolute bottom-3 left-3 glass bg-primary-foreground/30 rounded-full px-3 py-1">
                                <span className="text-[10px] font-bold text-foreground">
                                    {type}
                                </span>
                            </div>


                            {/* favorite */}
                            {showFav && (
                                <div className="absolute top-2 right-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-all duration-200 glass bg-primary-foreground/30 rounded-full px-2 py-1">
                                    <button className="text-2xl leading-none">♥</button>
                                </div>
                            )}
                        </div>

                        {/* text */}


                        <div className="pt-2">
                            <h3 className="text-sm md:text-lg font-semibold line-clamp-2">
                                {title}
                            </h3>
                            <p className="text-xs md:text-sm text-muted-foreground">
                                {year}
                            </p>
                        </div>
                    </div>
                )
            }

        </div>


    );
}