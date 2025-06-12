import { AlertTriangle, Home } from "lucide-react"
import { Link } from "react-router-dom"

export default function InvalidURLPage() {
    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 px-4 py-12 min-h-screen overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="-top-40 -right-32 absolute bg-red-200 opacity-30 blur-xl rounded-full w-80 h-80 animate-pulse mix-blend-multiply filter"></div>
                <div className="-bottom-40 -left-32 absolute bg-orange-200 opacity-30 blur-xl rounded-full w-80 h-80 animate-pulse mix-blend-multiply filter"></div>
                <div className="top-1/2 left-1/2 absolute bg-amber-200 opacity-20 blur-xl rounded-full w-96 h-96 -translate-x-1/2 -translate-y-1/2 transform mix-blend-multiply filter"></div>
            </div>

            {/* Main Content */}
            <div className="z-10 relative space-y-8 mx-auto max-w-2xl text-center">
                {/* Error Icon */}
                <div className="flex justify-center">
                    <div className="relative">
                        <div className="flex justify-center items-center bg-red-100 shadow-lg rounded-full w-24 h-24">
                            <AlertTriangle className="w-12 h-12 text-red-600" />
                        </div>
                        <div className="absolute inset-0 bg-red-200 opacity-25 rounded-full animate-ping"></div>
                    </div>
                </div>

                {/* Error Content */}
                <div className="space-y-6">
                    <div className="space-y-3">
                        <h1 className="font-bold text-gray-900 text-4xl md:text-5xl tracking-tight">404!</h1>
                        <div className="bg-gradient-to-r from-red-500 to-orange-500 mx-auto rounded-full w-24 h-1"></div>
                    </div>

                    <p className="mx-auto max-w-lg text-gray-600 text-lg md:text-xl leading-relaxed">
                        The link you followed is invalid.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex sm:flex-row flex-col justify-center items-center gap-4 mx-auto max-w-md">
                    <Link
                        to="/"
                        className="group flex justify-center items-center gap-3 bg-red-600 hover:bg-red-700 hover:shadow-lg px-8 py-4 rounded-xl w-full sm:w-auto font-semibold text-white hover:scale-105 transition-all duration-200 transform"
                    >
                        <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        Return Home
                    </Link>

                    {/* <button
                        onClick={() => window.location.reload()}
                        className="group flex justify-center items-center gap-3 bg-white hover:bg-gray-50 hover:shadow-lg px-8 py-4 border border-gray-200 hover:border-gray-300 rounded-xl w-full sm:w-auto font-semibold text-gray-700 hover:scale-105 transition-all duration-200 transform"
                    >
                        <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-300" />
                        Try Again
                    </button> */}
                </div>

                {/* Help Section */}
                <div className="mx-auto pt-8 border-gray-200 border-t max-w-md">
                    <p className="text-gray-500">
                        Need assistance?{" "}
                        <Link
                            to="/support"
                            className="font-semibold text-red-600 hover:text-red-700 underline underline-offset-2 hover:underline-offset-4 transition-all"
                        >
                            Contact Support
                        </Link>
                    </p>
                </div>
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0)`,
                        backgroundSize: "20px 20px",
                    }}
                ></div>
            </div>
        </div>
    )
}
