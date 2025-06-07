const Logo = () => {
    return (
        <div className="flex justify-center">
            <div className="flex items-center space-x-5">
                <div className="flex items-end space-x-1">
                    <div className="bg-gradient-to-t from-blue-700 to-blue-500 shadow-sm rounded-t-sm w-3 h-6"></div>
                    <div className="bg-gradient-to-t from-blue-800 to-blue-600 shadow-sm rounded-t-sm w-3 h-8"></div>
                    <div className="bg-gradient-to-t from-blue-900 to-blue-700 shadow-sm rounded-t-sm w-3 h-10"></div>
                    <div className="bg-gradient-to-t from-slate-800 to-slate-600 shadow-sm rounded-t-sm w-3 h-12"></div>
                </div>
                <div className="text-left">
                    <span
                        className="block font-semibold text-slate-900 text-xl leading-none tracking-tight"
                        style={{ fontFamily: "'Inter', sans-serif" }}
                    >
                        INSTABRIX
                    </span>
                    <span className="block mt-1.5 font-medium text-slate-600 text-xs uppercase tracking-[0.12em]">
                        Growth • Performance • Results
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Logo;