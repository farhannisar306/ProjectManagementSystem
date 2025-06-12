import { Lock, AlertCircle, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

const NotAuthenticatedPage = () => {

    return (
        <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
            {/* Main Content */}
            <div className="mx-auto px-6 py-12 max-w-6xl">
                {/* Top Section - Alert & Title */}
                <div className="mb-16 text-center">
                    <div className="inline-flex items-center bg-amber-50 mb-6 px-4 py-2 rounded-full font-medium text-amber-700 text-sm">
                        <AlertCircle className="mr-2 w-4 h-4" />
                        Authentication Required
                    </div>

                    <h1 className="mb-6 font-bold text-slate-900 text-4xl lg:text-5xl leading-tight">
                        Please sign in to continue
                    </h1>

                    <p className="mx-auto max-w-2xl text-slate-600 text-lg">
                        You need to be authenticated to access this page. Sign in to your Instabrix account to continue your
                        journey.
                    </p>
                </div>

                {/* Center Auth Card */}
                <div className="lg:col-span-6">
                    <div className="bg-white shadow-xl mx-auto border border-slate-200 rounded-2xl max-w-lg overflow-hidden">
                        {/* Card Header */}
                        <div className="p-6 border-slate-100 border-b text-center">
                            <div className="flex justify-center mb-4">
                                <div className="flex justify-center items-center bg-red-100 rounded-xl w-16 h-16">
                                    <Lock className="w-8 h-8 text-red-600" />
                                </div>
                            </div>
                            <h2 className="mb-2 font-bold text-slate-900 text-xl">Access Restricted</h2>
                            <p className="text-slate-500 text-sm">Authentication required to proceed</p>
                        </div>

                        {/* Card Body */}
                        <div className="space-y-6 p-6">
                            <div className="space-y-2 text-center">
                                <p className="text-slate-700 text-sm">
                                    You're trying to access a protected area of Instabrix. Please sign in with your credentials to
                                    continue.
                                </p>
                            </div>

                            {/* Authentication Actions */}
                            <div className="space-y-3">
                                <Link
                                    to="/login"
                                    className="flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 px-4 py-3 rounded-xl w-full font-medium text-white transition-all duration-200"
                                >
                                    <Lock className="w-5 h-5" />
                                    Sign In to Your Account
                                </Link>

                                <Link
                                    to="/signup"
                                    className="flex justify-center items-center gap-2 bg-white hover:bg-slate-50 px-4 py-3 border border-slate-200 hover:border-slate-300 rounded-xl w-full font-medium text-slate-800 transition-all duration-200"
                                >
                                    Create New Account
                                </Link>
                            </div>

                            {/* Help Links */}
                            <div className="pt-4 border-slate-100 border-t">
                                <div className="flex justify-between items-center text-sm">
                                    <Link to="/help" className="text-slate-600 hover:text-slate-900">
                                        Need help?
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="flex items-center gap-1 font-medium text-blue-600 hover:text-blue-700"
                                    >
                                        Contact Support
                                        <ArrowRight className="w-3 h-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotAuthenticatedPage
