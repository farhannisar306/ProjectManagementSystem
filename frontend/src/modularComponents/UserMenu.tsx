import useTokenStore from "../stores/TokenStore";


const UserMenu = () => {
    const { token, clearToken } = useTokenStore();

    return (
        <div className="relative">
            {token ? (
                <button onClick={() => clearToken()} className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                    <span className="flex justify-center items-center bg-gray-200 rounded-full w-8 h-8">
                        <span className="font-medium text-sm">U</span>
                    </span>
                    <span className="hidden md:inline-block">Account</span>
                </button>
            ) : (
                <div className="flex space-x-4">
                    <a href="/login" className="text-gray-700 hover:text-gray-900">Login</a>
                    <a href="/signup" className="text-gray-700 hover:text-gray-900">Sign Up</a>
                </div>
            )}
        </div>
    );
};

export default UserMenu;