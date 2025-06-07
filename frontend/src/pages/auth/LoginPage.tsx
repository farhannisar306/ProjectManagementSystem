import { useForm } from "react-hook-form"
import { Mail, Lock, Loader2 } from "lucide-react"
import { Link } from "react-router-dom"
import { useHttp } from "../../hooks/useHTTP"
import { useNotifications } from "../../providers/notification-provider"
import { useEffect } from "react"

type FormValues = {
  email: string
  password: string
}

type resData = {
  success: boolean,
  data: {
    token: string,
    user: {
      id: string,
      email: string,
      role: string
    },
  },
  message: string,
}

const LoginForm = () => {
  const { data, loading, error, statusCode, sendRequest } : { data:resData, } = useHttp();
  const { addNotification } = useNotifications()

  useEffect(() => {
    if (error) {
      addNotification({
        type: "error",
        title: "Error",
        message: error,
        length: 5000,
        //persistent: true,
        //footer: 'Click the X button above on the right to close this'
      })
    }
    if (data?.success) {
      addNotification({
        type: "success",
        title: "Success",
        message: data?.message,
        length: 5000,
        //persistent: true,
        //footer: 'Click the X button above on the right to close this'
      })
    }
    
  }, [data?.success, data?.message, error, addNotification])

  // if (data) {
  //   //console.log(data?.data)
  //   addNotification({
  //     type: "success",
  //     title: "Success",
  //     message: data?.message,
  //     length: 5000,
  //     //persistent: true,
  //     //footer: 'Click the X button above on the right to close this'
  //   })
  // }
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    await sendRequest(`user/login`, 'POST', {
      email: data.email,
      password: data.password
    }, {
      withCredentials: true,
    });
  }

  return (
    <main className="flex justify-center items-center bg-gray-200 p-4 sm:p-6 md:p-8 min-h-screen">
      <div className="bg-gradient-to-br from-slate-50 to-slate-100 shadow-2xl p-10 rounded-2xl w-full max-w-md overflow-hidden">
        <div className="mb-8 text-center">
          <h1 className="mb-2 font-bold text-slate-800 text-3xl tracking-tight">Log into your account</h1>
          {/* <p className="text-slate-500 text-sm">Join us in just a few seconds</p> */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="font-medium text-slate-700 text-sm">
              Email
            </label>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
              <Mail className="text-gray-400" />
              <input
                type="email"
                placeholder="you@example.com"
                className="outline-none w-full"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Enter a valid email",
                  },
                })}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="font-medium text-slate-700 text-sm">
              Password
            </label>
            <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg">
              <Lock className="text-gray-400" />
              <input
                type="password"
                placeholder="••••••••"
                className="outline-none w-full"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="flex justify-center items-center gap-2 bg-gradient-to-r from-blue-500 hover:from-blue-600 to-indigo-500 hover:to-indigo-600 py-2.5 rounded-lg w-full font-medium text-white transition duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Logging in...
              </>
            ) : (
              "Log in"
            )}
          </button>

          {/* Login Link */}
          <div className="flex justify-center gap-2 w-full text-slate-500 text-sm">
            Don't have an account?
            <Link className="font-medium text-blue-600 hover:text-blue-500 underline" to="/signup">Register here</Link>
          </div>
        </form>
      </div>
    </main>
  )
}

export default LoginForm