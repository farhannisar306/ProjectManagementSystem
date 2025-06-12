/* eslint-disable @typescript-eslint/no-unused-vars */
import { useForm } from "react-hook-form"
import { Mail, Lock, Loader2, LogIn, Sparkles, Shield, Zap, Users, ArrowRight, CheckCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useNotifications } from "../providers/Notification-Provider"
import { useHttp } from "../hooks/useHTTP"

type FormValues = {
  email: string
  password: string
}

type resData = {
  success: boolean
  data: {
    token: string
    user: {
      id: string
      email: string
      role: string
    }
  }
  message: string
}

const LoginModernCard = () => {
  const { data, loading, error, statusCode, sendRequest }: { data: resData } = useHttp()
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (error) {
      addNotification({
        type: "error",
        title: "Error",
        message: error,
        length: 5000,
      })
    }
    if (data?.success) {
      addNotification({
        type: "success",
        title: "Success",
        message: data?.message,
        length: 5000,
      })
    }
  }, [data?.success, data?.message, error, addNotification])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    await sendRequest(
      `auth/login`,
      "POST",
      {
        email: data.email,
        password: data.password,
      },
      {
        withCredentials: true,
      },
    )
  }

  const stats = [
    { icon: Users, value: "50K+", label: "Active Users" },
    { icon: Shield, value: "99.9%", label: "Uptime" },
    { icon: Zap, value: "2x", label: "Faster" },
  ]

  const features = [
    { icon: Shield, title: "Secure Access", desc: "Advanced security protocols protect your data" },
    { icon: Zap, title: "Lightning Fast", desc: "Optimized performance for seamless experience" },
    { icon: Users, title: "Team Ready", desc: "Collaborate with your team instantly" },
  ]

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 min-h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl w-10 h-10">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-2xl">Nexus Pro</span>
          </div>
          <Link to="/signup" className="font-medium text-slate-600 hover:text-slate-900 transition-colors">
            New to Nexus? <span className="text-blue-600">Create account</span>
          </Link>
        </header>

        <div className="items-center gap-8 grid lg:grid-cols-12 min-h-[calc(100vh-200px)]">
          {/* Left Column - Marketing */}
          <div className="space-y-8 lg:col-span-7">
            <div>
              <div className="inline-flex items-center bg-blue-50 mb-6 px-4 py-2 rounded-full font-medium text-blue-700 text-sm">
                <CheckCircle className="mr-2 w-4 h-4" />
                Welcome back
              </div>

              <h1 className="mb-6 font-bold text-slate-900 text-5xl lg:text-6xl leading-tight">
                Continue your
                <span className="block text-blue-600">journey</span>
              </h1>

              <p className="mb-8 max-w-2xl text-slate-600 text-xl">
                Sign in to access your projects, collaborate with your team, and continue building amazing things with
                Nexus Pro.
              </p>
            </div>

            {/* Stats */}
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white shadow-sm p-6 border border-slate-200 rounded-2xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="flex justify-center items-center bg-blue-50 rounded-xl w-10 h-10">
                      <stat.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-bold text-slate-900 text-2xl">{stat.value}</span>
                  </div>
                  <p className="text-slate-600 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border-slate-200 border-b-2"
                >
                  <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl w-12 h-12">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-slate-600 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="flex justify-center lg:col-span-5 w-full">
            <div className="bg-white shadow-xl px-6 sm:px-8 md:px-10 py-10 sm:py-14 md:py-20 border border-slate-200 rounded-3xl w-full sm:max-w-md md:max-w-lg">

              <div className="mb-8 text-center">
                <div className="flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4 rounded-2xl w-16 h-16">
                  <LogIn className="w-8 h-8 text-white" />
                </div>
                <h2 className="mb-2 font-bold text-slate-900 text-2xl">Welcome Back</h2>
                <p className="text-slate-600">Sign in to your account to continue</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block mb-2 font-semibold text-slate-700 text-sm">Email Address</label>
                  <div className="relative">
                    <Mail className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="bg-slate-50 focus:bg-white py-3 pr-4 pl-10 border border-slate-300 focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 w-full transition-all duration-200"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Enter a valid email",
                        },
                      })}
                    />
                  </div>
                  {errors.email && <p className="mt-2 text-red-600 text-sm">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700 text-sm">Password</label>
                  <div className="relative">
                    <Lock className="top-1/2 left-3 absolute w-5 h-5 text-slate-400 -translate-y-1/2 transform" />
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="bg-slate-50 focus:bg-white py-3 pr-4 pl-10 border border-slate-300 focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 w-full transition-all duration-200"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                    />
                  </div>
                  {errors.password && <p className="mt-2 text-red-600 text-sm">{errors.password.message}</p>}
                </div>

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link
                    to="/forgot-password"
                    className="font-medium text-blue-600 hover:text-blue-700 text-sm transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group flex justify-center items-center bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 disabled:opacity-50 shadow-lg px-4 py-3 rounded-xl w-full font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-600 text-sm">
                  Don't have an account?{" "}
                  <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    Create account
                  </Link>
                </p>
              </div>

              {/* Additional Security Info */}
              <div className="bg-slate-50 mt-6 p-4 rounded-xl">
                <div className="flex items-center space-x-2 text-slate-600 text-sm">
                  <Shield className="w-4 h-4 text-slate-500" />
                  <span>Your connection is secured with 256-bit SSL encryption</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginModernCard
