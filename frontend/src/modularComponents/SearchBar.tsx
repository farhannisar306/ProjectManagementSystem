import { Search } from "lucide-react";

const SearchBar = () => {
    return (
        <div className="hidden md:block flex-1 max-w-2xl">
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search products..."
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                />
                <button className="top-1/2 right-3 absolute -translate-y-1/2">
                    <Search />
                </button>
            </div>
        </div>
    );
};

export default SearchBar;