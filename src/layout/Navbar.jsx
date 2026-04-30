import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { ChevronDown, ChevronUp, Menu, X } from "lucide-react";

const navLinks = [
    { href: "/", label: "Home" },
    {
        href: "/movies", label: "Movies", sub: [
            { href: "/movies", label: "Popular" },
            { href: "/movies/top-rated", label: "Top Rated" },
            { href: "/movies/upcoming", label: "Upcoming" },
        ],
    },
    {
        href: "/tv-series", label: "TV Series", sub: [
            { href: "/tv", label: "Popular" },
            { href: "/tv/top-rated", label: "Top Rated" },
            { href: "/tv/on-the-air", label: "On Tv" },
        ],
    },
    { href: "/trending", label: "Trending" },
    { href: "/artists", label: "Artists" },
]
export const Navbar = () => {

    //mobile
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMobileDropdown, setIsMobileDropdown] = useState(null);
    // const [openDropdown, setOpenDropdown] = useState(null);

    //scroll
    const [isScrolled, setIsScrolled] = useState(false);


    //scroll funtion
    useEffect(() => {

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <header className={`fixed top-0 left-0 right-0 transaction-all duration-500 ${isScrolled ? "glass-strong py-3" : "bg-transparent py-5"} z-50`}>
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <a href="#" className="text-xl font-bold tracking-tight hover:text-primary">
                    THE<span className="text-primary">MOVIES</span>
                </a>

                {/* Destop navbar */}
                <div className="hidden md:flex items-center gap-1">
                    <div className="glass rounded-full px-2 py-1 flex items-center gap-10">
                        {
                            navLinks.map((link, index) => {

                                // dropdown - navbar with dropdown
                                if (link.sub) {
                                    return (
                                        <div key={index} className="relative group">
                                            <span className="px-5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface cursor-pointer">
                                                {link.label}
                                            </span>

                                            {/* Dropdown menu */}
                                            <div className="absolute left-0 top-full mt-2 w-40 rounded-xl bg-surface shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                                                {link.sub.map((child, idx) => (
                                                    <Link
                                                        key={idx}
                                                        to={child.href}
                                                        className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                                                    >
                                                        {child.label}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }
                                return (
                                    <Link key={index} to={link.href} className="px-5 py-2 text-sm text-muted-foreground hover:text-foreground rounded-full hover:bg-surface">
                                        {link.label}
                                    </Link>
                                )
                            })
                        }
                    </div>
                </div>

                {/* CTA Button */}
                <div className="hidden md:block">
                    <Button size="sm"> Contact Dev</Button>
                </div>

                {/* mobile menu */}
                <button className="md:hidden p-2 text-foreground cursor-pointer" onClick={() => setIsMobileMenuOpen((prev) => !prev)} >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* mobile view */}
            {
                isMobileMenuOpen && (
                    <div className="md:hidden glass-strong animate-fade-in">
                        <div className="container mx-auto px-6 py-6 flex flex-col gap-4">
                            {
                                navLinks.map((link, index) => (
                                    <div className="">
                                        <Link key={index} to={link.href} className="py-2 text-lg text-muted-foreground hover:text-foreground">
                                            {
                                                link.sub ? (
                                                    <div className="flex justify-between" onClick={() => setIsMobileDropdown(isMobileDropdown === index ? null : index)}>
                                                        <span>{link.label}</span>
                                                        <ChevronDown size={20} className={`transition-transform duration-200 ${isMobileDropdown === index ? "rotate-180" : "rotate-0"}`} />
                                                    </div>
                                                ) : link.label
                                            }
                                        </Link>
                                        {/* Dropdown items */}
                                        {
                                            link.sub && isMobileDropdown === index && (
                                                <div className="flex flex-col pl-4 mt-1">
                                                    {
                                                        link.sub.map((sublink, ind) => (
                                                            <Link key={ind} to={sublink.href} className="py-2 px-3 text-base text-muted-foreground hover:text-foreground rounded-md">{sublink.label}</Link>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }
                                    </div>


                                ))
                            }

                            {/* CTA Button */}

                            <Button> Contact Dev</Button>

                        </div>
                    </div>
                )
            }
        </header>
    );
}