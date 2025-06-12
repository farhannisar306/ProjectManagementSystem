import { useForm, type SubmitHandler } from "react-hook-form"
import { User, Loader2, Github, ArrowRight, Sparkles, Trophy, Users, Zap, Shield, Star } from "lucide-react"
import { Link } from "react-router-dom"
import { useEffect } from "react"
import { useNotifications } from "../providers/Notification-Provider"
import { useHttp } from "../hooks/useHTTP"
import { backend_port, base_url } from "../config/config"

type FormValues = {
  avatar: File | null
  fullname: string
  email: string
  password: string
  confirmPassword: string
}

const SignupVariation3 = () => {
  const { addNotification } = useNotifications()
  const { data, loading, error, statusCode, sendRequest } = useHttp()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const { password, confirmPassword } = data
    if (password !== confirmPassword) {
      addNotification({
        type: "error",
        title: "Sign-Up Failed",
        message: "Passwords must match.",
        length: 5000,
      })
      return
    } else {
      await sendRequest(
        `user/create`,
        "POST",
        {
          username: data.fullname,
          email: data.email,
          password: data.password,
        },
        {
          withCredentials: true,
        },
      )
    }
  }

  const handleOAuthLogin = async (provider: string) => {
    window.location.href = `${base_url}:${backend_port}/api/v1/auth/${provider}`
  }

  useEffect(() => {
    if (statusCode != null && error != null) {
      addNotification({
        type: "error",
        title: `Status Code: ${statusCode.toString()}`,
        message: error,
        length: 5000,
      })
    }

    if ((statusCode === 201 || statusCode === 200) && !error) {
      addNotification({
        type: "success",
        title: "Success",
        message: "Account created successfully",
        length: 5000,
      })
    }
  }, [data, loading, error, statusCode, addNotification])

  const stats = [
    { icon: Users, value: "50K+", label: "Active Users" },
    { icon: Trophy, value: "99.9%", label: "Uptime" },
    { icon: Star, value: "4.9", label: "Rating" },
  ]

  const benefits = [
    { icon: Shield, title: "Enterprise Security", desc: "Advanced encryption & compliance" },
    { icon: Zap, title: "Lightning Performance", desc: "Optimized for speed & reliability" },
    { icon: Users, title: "Team Collaboration", desc: "Built for modern teams" },
  ]

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 h-screen">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl w-10 h-10">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-slate-900 text-2xl">Nexus Pro</span>
          </div>
          <Link to="/login" className="font-medium text-slate-600 hover:text-slate-900 transition-colors">
            Already have an account? <span className="text-blue-600">Sign in</span>
          </Link>
        </header>

        <div className="items-start gap-8 grid lg:grid-cols-12">
          {/* Left Column - Marketing */}
          <div className="space-y-8 lg:col-span-7">
            <div>
              <div className="inline-flex items-center bg-blue-50 mb-6 px-4 py-2 rounded-full font-medium text-blue-700 text-sm">
                <Sparkles className="mr-2 w-4 h-4" />
                Join the revolution
              </div>

              <h1 className="mb-6 font-bold text-slate-900 text-5xl lg:text-6xl leading-tight">
                Build the future,
                <span className="block text-blue-600">together</span>
              </h1>

              <p className="mb-8 max-w-2xl text-slate-600 text-xl">
                Join thousands of innovators using Nexus Pro to create, collaborate, and scale their ideas into reality.
              </p>
            </div>

            {/* Stats */}
            <div className="gap-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 p-4">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col justify-between bg-white shadow-sm p-5 border border-slate-200 rounded-2xl">
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


            {/* Benefits */}
            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-4 border-slate-200 border-b-2"
                >
                  <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl w-12 h-12">
                    <benefit.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-slate-900">{benefit.title}</h3>
                    <p className="text-slate-600 text-sm">{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="lg:col-span-5">
            <div className="top-8 sticky bg-white shadow-xl p-8 border border-slate-200 rounded-3xl">
              <div className="mb-8 text-center">
                <div className="flex justify-center items-center bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto mb-4 rounded-2xl w-16 h-16">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="mb-2 font-bold text-slate-900 text-2xl">Create Your Account</h2>
                <p className="text-slate-600">Get started in less than 2 minutes</p>
              </div>

              {/* OAuth Buttons */}
              <div className="gap-3 grid grid-cols-2 mb-6">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin("google")}
                  className="flex justify-center items-center bg-white hover:bg-slate-50 px-4 py-3 border border-slate-300 rounded-xl font-medium text-slate-700 transition-all duration-200 cursor-pointer"
                >
                  <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Google
                </button>

                <button
                  type="button"
                  onClick={() => handleOAuthLogin("github")}
                  className="flex justify-center items-center bg-white hover:bg-slate-50 px-4 py-3 border border-slate-300 rounded-xl font-medium text-slate-700 transition-all duration-200 cursor-pointer"
                >
                  <Github className="mr-2 w-5 h-5" />
                  GitHub
                </button>
              </div>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="border-slate-300 border-t w-full"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-3 text-slate-500">or</span>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div>
                  <label className="block mb-2 font-semibold text-slate-700 text-sm">Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="bg-slate-50 focus:bg-white px-4 py-3 border border-slate-300 focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 w-full transition-all duration-200"
                    {...register("fullname", {
                      required: "Full name is required",
                      pattern: {
                        value: /^[a-zA-Z]+(?: [a-zA-Z]+)+$/,
                        message: "Enter first and last name",
                      },
                    })}
                  />
                  {errors.fullname && <p className="mt-2 text-red-600 text-sm">{errors.fullname.message}</p>}
                </div>

                <div>
                  <label className="block mb-2 font-semibold text-slate-700 text-sm">Email Address</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="bg-slate-50 focus:bg-white px-4 py-3 border border-slate-300 focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 w-full transition-all duration-200"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: "Enter a valid email",
                      },
                    })}
                  />
                  {errors.email && <p className="mt-2 text-red-600 text-sm">{errors.email.message}</p>}
                </div>

                <div className="gap-4 grid grid-cols-2">
                  <div>
                    <label className="block mb-2 font-semibold text-slate-700 text-sm">Password</label>
                    <input
                      type="password"
                      placeholder="Password"
                      className="bg-slate-50 focus:bg-white px-4 py-3 border border-slate-300 focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 w-full transition-all duration-200"
                      {...register("password", {
                        required: "Password is required",
                        minLength: {
                          value: 6,
                          message: "Min 6 characters",
                        },
                      })}
                    />
                    {errors.password && <p className="mt-2 text-red-600 text-sm">{errors.password.message}</p>}
                  </div>

                  <div>
                    <label className="block mb-2 font-semibold text-slate-700 text-sm">Confirm</label>
                    <input
                      type="password"
                      placeholder="Confirm"
                      className="bg-slate-50 focus:bg-white px-4 py-3 border border-slate-300 focus:border-transparent rounded-xl focus:ring-2 focus:ring-blue-500 w-full transition-all duration-200"
                      {...register("confirmPassword", {
                        required: "Please confirm password",
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="mt-2 text-red-600 text-sm">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex justify-center items-center bg-gradient-to-r from-blue-600 hover:from-blue-700 to-indigo-600 hover:to-indigo-700 disabled:opacity-50 shadow-lg px-4 py-3 rounded-xl w-full font-semibold text-white transition-all duration-200 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="mr-2 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-slate-600 text-sm">
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="font-medium text-blue-600 hover:text-blue-700">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="font-medium text-blue-600 hover:text-blue-700">
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignupVariation3
