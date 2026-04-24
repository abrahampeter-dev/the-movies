import { useState } from "react";

export const Search = ({ onSearch }) => {

    const [searchQ, setSearchQ] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!searchQ.trim()) return;
        onSearch?.(searchQ);
    };


    return (
        <div className="w-full flex justify-center my-10 px-4">
            <form
                onSubmit={handleSubmit}
                className="flex items-center w-full max-w-xl bg-white shadow-md rounded-2xl overflow-hidden"
            >
                <input
                    type="text"
                    placeholder="Search anything..."
                    value={searchQ}
                    onChange={(e) => setSearchQ(e.target.value)}
                    className="flex-1 px-4 py-3 outline-none text-gray-700"
                />

                <button
                    type="submit"
                    className="bg-primary text-white px-6 py-3 hover:bg-primary/90 transition"
                >
                    Search
                </button>
            </form>
        </div>
    )
}