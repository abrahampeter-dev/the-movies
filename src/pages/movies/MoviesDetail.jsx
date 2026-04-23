import { IdCardIcon } from "lucide-react";
import { useParams } from "react-router-dom";

export const MovieDetails = () => {
    const { id } = useParams();
    return (
        <div className="py-32 relative overflow-hidden">
            <div className="container mx-auto px-1 lg:px-6">
                <div className="">Detail page {id}</div>
            </div>
        </div>
    );
}