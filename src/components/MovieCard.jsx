import { useState } from "react";

export const MovieCard = ({ image, title, year, type = "Movie", onFavorite, showFav = true }) => {


    return (
        <div className="relative max-w-md mx-auto">
            <div className="group relative shrink-0 w-37.5 md:w-50 rounded-lg glass">

                {/* image wrapper handles clipping */}
                <div className="rounded-lg h-65">
                    <img
                        src={image}
                        alt="junabra"
                        className="w-full h-full object-cover aspect-4/5"
                    />

                </div>

                {/* topleft */}
                <div className="absolute bottom-14 left-1 glass bg-primary-foreground/20 rounded-full px-2 py-2">
                    <span className="text-[10px] font-bold text-foreground">
                        {type}
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

                {/* text below */}
                <div className="px-3 py-2">
                    <h3 className="text-xl font-semibold leading-tight line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        {year}
                    </p>
                </div>
            </div>
        </div>

        // <div className="relative max-w-md mx-auto">
        //     <div
        //         className="relative glass shrink-0 w-37.5 md:w-50 h-65 rounded-lg bg-muted"
        //     >
        //         <img src="/pggg.jpeg" alt="junabra" className="relative aspect-4/5" />
        //         {/* topleft */}
        //         <div className="absolute -top-1 -left-1 glass bg-primary-foreground rounded-full px-1 py-2">
        //             <div className="text-[8px] font-bold text-foreground">Movie</div>
        //         </div>
        //     </div>
        // </div>

    );
}