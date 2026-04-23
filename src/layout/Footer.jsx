export const Footer = () => {

    const currentYear = new Date().getFullYear();

    return (
        <footer className="py-6 border-t border-border">
            <div className="container mx-auto px-6">
                <h6 className="flex flex-wrap justify-center">
                    © {currentYear} Themovies. All rights reserved.

                </h6>
            </div>
        </footer>
    )
}