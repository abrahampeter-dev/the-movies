export const Error = ({ text, onRetry }) => {
    return (
        <div className="flex flex-col justify-center items-center h-40 gap-3 text-center">

            {/* Error Icon */}
            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 text-red-500 text-xl font-bold animate-pulse">
                !
            </div>

            {/* Error Text */}
            <p className="text-gray-600 text-sm">{text}</p>

            {/* Retry Button */}
            {onRetry && (
                <button
                    onClick={onRetry}
                    className="mt-1 px-4 py-1.5 text-sm bg-primary text-white rounded-md hover:opacity-90 transition"
                >
                    Try Again
                </button>
            )}
        </div>
    )
}