import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useHttp } from "../../hooks/useHTTP"
import { CheckCircle, AlertCircle, Loader2, Mail, ArrowRight, Home } from "lucide-react"

const VerifyEmailPage = () => {
    const { token } = useParams()
    const { data, loading, error, statusCode, sendRequest } = useHttp()
    const [animationComplete, setAnimationComplete] = useState(false)


    const onResendClick = () => {
        sendRequest(
            `auth/resend-activation-mail/${token}`, "GET", {},
            {
                withCredentials: true,
            },
        )
    }

    useEffect(() => {
        // Start with a slight delay for better UX
        const timer = setTimeout(() => {
            sendRequest(
                `auth/verify-email/${token}`, "POST", {},
                {
                    withCredentials: true,
                },
            )
        }, 1000)

        return () => clearTimeout(timer)
    }, [token, sendRequest])

    // Handle animation completion
    useEffect(() => {
        if (!loading && (data || error)) {
            const timer = setTimeout(() => {
                setAnimationComplete(true)
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [loading, data, error])

    return (
        <div className="flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 min-h-screen">
            {/* Background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="top-0 left-0 absolute bg-gradient-to-b from-blue-100 to-transparent opacity-40 w-full h-64"></div>
                <div className="bottom-0 left-0 absolute bg-gradient-to-t from-purple-100 to-transparent opacity-40 w-full h-64"></div>
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(79, 70, 229, 0.05) 1px, transparent 0)`,
                        backgroundSize: "30px 30px",
                    }}
                ></div>
            </div>

            {/* Content container */}
            <div className="z-10 relative w-full max-w-md">
                <div className="bg-white/80 shadow-xl backdrop-blur-sm rounded-2xl overflow-hidden">
                    {/* Header with envelope illustration */}
                    <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white text-center">
                        <div className="absolute inset-0 overflow-hidden">
                            <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                                }}
                            ></div>
                        </div>
                        <div className="flex justify-center mb-4">
                            <div className="flex justify-center items-center bg-white shadow-lg rounded-full w-20 h-20">
                                <Mail className="w-10 h-10 text-indigo-600" />
                            </div>
                        </div>
                        <h1 className="mb-1 font-bold text-2xl">Email Verification</h1>
                        <p className="text-indigo-100">We're confirming your email address</p>
                    </div>

                    {/* Status content */}
                    <div className="p-6">
                        {loading && (
                            <div className="py-8 text-center">
                                <div className="flex justify-center mb-4">
                                    <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
                                </div>
                                <h2 className="mb-2 font-semibold text-gray-800 text-xl">Verifying Your Email</h2>
                                <p className="text-gray-600">Please wait while we confirm your email address...</p>
                            </div>
                        )}

                        {!loading && data && (
                            <div
                                className={`text-center py-8 transition-opacity duration-500 ${animationComplete ? "opacity-100" : "opacity-0"}`}
                            >
                                <div className="flex justify-center mb-4">
                                    <div className="relative">
                                        <CheckCircle className="w-16 h-16 text-green-500" />
                                        <span className="absolute inset-0 bg-green-400 opacity-20 rounded-full animate-ping"></span>
                                    </div>
                                </div>
                                <h2 className="mb-2 font-semibold text-gray-800 text-xl">Email Verified Successfully!</h2>
                                <p className="mb-6 text-gray-600">
                                    Your email has been verified. You can now access all features of your account.
                                </p>
                                <div className="flex justify-center">
                                    <Link
                                        to="/login"
                                        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg px-6 py-3 rounded-lg font-medium text-white transition-all duration-200"
                                    >
                                        Continue to Login
                                        <ArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>
                            </div>
                        )}

                        {!loading && error && (
                            <div
                                className={`text-center py-8 transition-opacity duration-500 ${animationComplete ? "opacity-100" : "opacity-0"}`}
                            >
                                <div className="flex justify-center mb-4">
                                    <AlertCircle className="w-16 h-16 text-red-500" />
                                </div>
                                <h2 className="mb-2 font-semibold text-gray-800 text-xl">Verification Failed</h2>
                                <p className="mb-2 text-gray-600">
                                    {statusCode === 410
                                        ? "This verification link has expired."
                                        : "We couldn't verify your email address."}
                                </p>
                                <p className="mb-6 text-gray-500">
                                    {statusCode === 410
                                        ? "Please request a new verification email."
                                        : "The link may be invalid or already used."}
                                </p>
                                <div className="flex sm:flex-row flex-col justify-center gap-3">
                                    <button
                                        onClick={onResendClick}
                                        className="inline-flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg px-6 py-3 rounded-lg font-medium text-white transition-all duration-200"
                                    >
                                        <Mail className="w-4 h-4" />
                                        Resend Email
                                    </button>
                                    <Link
                                        to="/"
                                        className="inline-flex justify-center items-center gap-2 bg-white hover:bg-gray-50 hover:shadow-lg px-6 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 transition-all duration-200"
                                    >
                                        <Home className="w-4 h-4" />
                                        Go Home
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-gray-200 border-t text-gray-500 text-sm text-center">
                        <p>
                            Need help?{" "}
                            <a href="/support" className="font-medium text-indigo-600 hover:text-indigo-800">
                                Contact Support
                            </a>
                        </p>
                    </div>
                </div>

                {/* Brand signature */}
                <div className="mt-6 text-center">
                    <p className="text-indigo-800/60 text-sm">
                        Secured by <span className="font-semibold">YourBrand</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default VerifyEmailPage
