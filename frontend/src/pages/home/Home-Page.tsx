import { ArrowRight, Users, BarChart3, Shield, Clock } from "lucide-react"
import Carousel from "../../components/ui/Carousel"
import { NavLink } from "react-router-dom"


const CheckCircleInfo = [
  {
    icon: Clock,
    text: "Intuitive task management and scheduling",
    description: "Streamline your workflow with smart automation",
  },
  {
    icon: Users,
    text: "Real-time collaboration tools",
    description: "Connect teams across the globe seamlessly",
  },
  {
    icon: BarChart3,
    text: "Comprehensive analytics and reporting",
    description: "Data-driven insights for better decisions",
  },
  {
    icon: Shield,
    text: "Enterprise-grade security",
    description: "Your data protected with military-grade encryption",
  },
]

const HomePage = () => {
  return (
    <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen">
      <div className="mx-auto px-6 lg:px-8 container">
        <div className="flex lg:flex-row flex-col items-center gap-12 lg:gap-20 py-12 min-h-screen">
          {/* Left info section */}
          <div className="flex flex-col justify-center gap-8 slide-in-from-left lg:max-w-[55%] animate-in duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-100 to-teal-100 shadow-sm px-6 py-2 border border-emerald-200/50 rounded-full w-fit">
              <div className="bg-emerald-500 mr-3 rounded-full w-2 h-2 animate-pulse"></div>
              <span className="font-medium text-emerald-800 text-sm">Project management simplified</span>
            </div>

            {/* Main heading */}
            <div className="space-y-6">
              <h1 className="font-bold text-slate-900 text-4xl md:text-5xl lg:text-6xl leading-tight">
                Manage Projects with{" "}
                <span className="bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 text-transparent">
                  Elegance
                </span>{" "}
                and{" "}
                <span className="bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent">
                  Efficiency
                </span>
              </h1>

              <p className="max-w-2xl text-slate-600 text-xl leading-relaxed">
                A sophisticated project management solution designed for teams that demand excellence. Streamline
                workflows, enhance collaboration, and deliver results on time.
              </p>
            </div>

            {/* Features list */}
            <div className="gap-6 grid grid-cols-1 md:grid-cols-2 pt-4">
              {CheckCircleInfo.map((feature, index) => {
                const IconComponent = feature.icon
                return (
                  <div
                    key={index}
                    className="group flex items-start space-x-4 hover:bg-white/50 hover:shadow-md p-4 rounded-xl transition-all duration-300"
                  >
                    <div className="flex flex-shrink-0 justify-center items-center bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg w-10 h-10 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <div className="space-y-1">
                      <span className="block font-semibold text-slate-800">{feature.text}</span>
                      <span className="text-slate-500 text-sm">{feature.description}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Button group */}
            <div className="flex sm:flex-row flex-col gap-4 pt-4">
              <NavLink to="/signup" className="group flex justify-center items-center bg-gradient-to-r from-emerald-600 hover:from-emerald-700 to-teal-600 hover:to-teal-700 shadow-lg hover:shadow-xl px-8 py-4 rounded-xl font-semibold text-white hover:scale-105 transition-all duration-300 transform">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1 duration-300" />
              </NavLink>
              <button className="flex justify-center items-center hover:bg-white/80 hover:shadow-md backdrop-blur-sm px-8 py-4 border border-slate-300 rounded-xl font-semibold text-slate-700 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right carousel section */}
          <div className="slide-in-from-right flex-1 w-full lg:max-w-[45%] h-[500px] lg:h-[600px] duration-1000 delay-300">
            <Carousel autoPlay={true} interval={5000}>
              <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-rose-400 via-pink-500 to-purple-600 w-full h-full overflow-hidden text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="z-10 relative space-y-4 p-8 text-center">
                  <div className="flex justify-center items-center bg-white/20 backdrop-blur-sm mx-auto mb-6 rounded-full w-20 h-20">
                    <BarChart3 className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-3xl">Analytics Dashboard</h3>
                  <p className="opacity-90 max-w-md text-lg">
                    Comprehensive insights and real-time metrics to drive your projects forward
                  </p>
                </div>
                <div className="-right-10 -bottom-10 absolute bg-white/10 rounded-full w-40 h-40"></div>
                <div className="-top-10 -left-10 absolute bg-white/10 rounded-full w-32 h-32"></div>
              </div>

              <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600 w-full h-full overflow-hidden text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="z-10 relative space-y-4 p-8 text-center">
                  <div className="flex justify-center items-center bg-white/20 backdrop-blur-sm mx-auto mb-6 rounded-full w-20 h-20">
                    <Users className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-3xl">Team Collaboration</h3>
                  <p className="opacity-90 max-w-md text-lg">
                    Seamless communication and collaboration tools for distributed teams
                  </p>
                </div>
                <div className="-bottom-16 -left-16 absolute bg-white/10 rounded-full w-48 h-48"></div>
                <div className="-top-8 -right-8 absolute bg-white/10 rounded-full w-24 h-24"></div>
              </div>

              <div className="relative flex flex-col justify-center items-center bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 w-full h-full overflow-hidden text-white">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="z-10 relative space-y-4 p-8 text-center">
                  <div className="flex justify-center items-center bg-white/20 backdrop-blur-sm mx-auto mb-6 rounded-full w-20 h-20">
                    <Shield className="w-10 h-10" />
                  </div>
                  <h3 className="font-bold text-3xl">Enterprise Security</h3>
                  <p className="opacity-90 max-w-md text-lg">
                    Military-grade encryption and compliance standards for peace of mind
                  </p>
                </div>
                <div className="-right-12 -bottom-12 absolute bg-white/10 rounded-full w-36 h-36"></div>
                <div className="-top-6 -left-6 absolute bg-white/10 rounded-full w-28 h-28"></div>
              </div>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
