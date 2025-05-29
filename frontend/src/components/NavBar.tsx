import Logo from '../modularComponents/Logo';
import SearchBar from '../modularComponents/SearchBar';
import UserMenu from '../modularComponents/UserMenu';

const NavBar = () => {
    return (
        <nav className="bg-white shadow-sm px-8">
            <div className="flex justify-between items-center h-16">
                {/* Left section */}
                <div className="flex items-center">
                    <Logo />
                    <div className="hidden md:flex space-x-8 ml-10">
                        <a href="/" className="text-gray-700 hover:text-gray-900">Home</a>
                        <a href="/products" className="text-gray-700 hover:text-gray-900">Products</a>
                        <a href="/categories" className="text-gray-700 hover:text-gray-900">Categories</a>
                    </div>
                </div>

                {/* Middle section */}
                <SearchBar />

                {/* Right section */}
                <div className="flex items-center space-x-4">
                    <button className="text-gray-700 hover:text-gray-900">
                        🛒
                        <span className="sr-only">Shopping cart</span>
                    </button>
                    <UserMenu />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;