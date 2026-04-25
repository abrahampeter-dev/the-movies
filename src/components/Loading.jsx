export const CustomLoading = ({ text }) => {
    return (
        < div className="flex flex-col justify-center items-center h-40 gap-3">
            <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
            <p className="text-gray-600 text-sm">{text}</p>
        </div>
    )
}