export const Hero = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* background */}
            <div className="absolute inset-0">
                {/* mobile */}
                {/* <img
                    src="/hero-bg.jpg"
                    alt="hero"
                    className="md:hidden w-full h-full object-cover opacity-40"
                /> */}

                {/* desktop marquee */}
                <div className="flex h-full overflow-hidden">
                    {/* marquee viewport */}
                    <div className="relative w-full h-full overflow-hidden">
                        {/* marquee track */}
                        <div className="flex h-full w-[200%] animate-hero-marquee">
                            {[...Array(6), ...Array(6)].map((_, i) => (
                                <div
                                    key={i}
                                    className="shrink-0 w-120 mx-0.3 h-full rounded-sm overflow-hidden bg-primary-foreground"
                                >
                                    <img
                                        src="/pggg.jpeg"
                                        alt="hero"
                                        className="w-full h-full object-cover opacity-60"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background" />
            </div>

            {/* content */}

            <div className="absolute bottom-0 left-0 z-10 w-full">
                <div className="container mx-auto px-6 pb-20">
                    <div className="max-w-4xl">
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100 text-primary glow-text">
                            That's a Wrap Latest
                            <br />
                            <span className="font-serif italic font-normal text-white">The best (and worst) of the year from TMDB.</span>
                        </h1>
                    </div>
                </div>
            </div>
        </div>
    );
};
