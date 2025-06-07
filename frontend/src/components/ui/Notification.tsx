import { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { CheckCircle, XCircle, AlertTriangle, Info, X, Clock, Sparkles } from "lucide-react"
import type { NotificationData } from "../../providers/notification-provider"

interface NotificationProps extends NotificationData {
    index: number
    onClose: (id: string) => void
}

const typeConfig = {
    success: {
        icon: CheckCircle,
        bgColor: "bg-gray-800",
        borderColor: "border-emerald-400",
        iconColor: "text-emerald-400",
        titleColor: "text-white",
        messageColor: "text-gray-200",
        footerColor: "text-emerald-300",
        shadowColor: "shadow-emerald-400/50",
        accentColor: "bg-emerald-400",
    },
    error: {
        icon: XCircle,
        bgColor: "bg-gray-800",
        borderColor: "border-red-400",
        iconColor: "text-red-400",
        titleColor: "text-white",
        messageColor: "text-gray-200",
        footerColor: "text-red-300",
        shadowColor: "shadow-red-400/50",
        accentColor: "bg-red-400",
    },
    warning: {
        icon: AlertTriangle,
        bgColor: "bg-gray-800",
        borderColor: "border-amber-400",
        iconColor: "text-amber-400",
        titleColor: "text-white",
        messageColor: "text-gray-200",
        footerColor: "text-amber-300",
        shadowColor: "shadow-amber-400/50",
        accentColor: "bg-amber-400",
    },
    info: {
        icon: Info,
        bgColor: "bg-gray-800",
        borderColor: "border-blue-400",
        iconColor: "text-blue-400",
        titleColor: "text-white",
        messageColor: "text-gray-200",
        footerColor: "text-blue-300",
        shadowColor: "shadow-blue-400/50",
        accentColor: "bg-blue-400",
    },
}

const containerVariants = {
    hidden: {
        x: 400,
        opacity: 0,
        scale: 0.95,
    },
    visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            type: "spring",
            damping: 20,
            stiffness: 300,
            duration: 0.5,
        },
    },
    exit: {
        x: 400,
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.3,
            ease: "easeInOut",
        },
    },
}

const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: {
        scale: 1,
        rotate: 0,
        transition: {
            type: "spring",
            damping: 12,
            stiffness: 400,
            delay: 0.1,
        },
    },
}

const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2,
            duration: 0.4,
            ease: "easeOut",
        },
    },
}

const closeButtonVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
        scale: 1,
        opacity: 1,
        transition: {
            delay: 0.3,
            type: "spring",
            damping: 15,
            stiffness: 400,
        },
    },
    hover: {
        scale: 1.1,
        rotate: 90,
        transition: { duration: 0.2 },
    },
    tap: { scale: 0.9 },
}

export default function Notification({
    id,
    type,
    title,
    message,
    footer,
    length,
    persistent,
    index,
    onClose,
}: NotificationProps) {
    const [remainingTime, setRemainingTime] = useState<number | null>(null)

    const config = typeConfig[type]
    const IconComponent = config.icon

    const handleClose = useCallback(() => {
        onClose(id)
    }, [id, onClose])

    useEffect(() => {
        if (persistent || !length) return

        // Set initial remaining time
        setRemainingTime(Math.ceil(length / 1000))

        let countdownInterval: ReturnType<typeof setInterval>
        let hideTimer: ReturnType<typeof setTimeout>

        // Start countdown interval
        countdownInterval = setInterval(() => {
            setRemainingTime((prev) => {
                if (prev === null || prev <= 0) return 0
                const newTime = prev - 0.1
                return newTime <= 0 ? 0 : newTime
            })
        }, 100)

        // Set auto-close timer
        hideTimer = setTimeout(handleClose, length)

        return () => {
            clearInterval(countdownInterval)
            clearTimeout(hideTimer)
        }
    }, [length, persistent, handleClose])

    return (
        <motion.div
            layout
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`
          relative overflow-hidden w-96 mb-4
          ${config.bgColor} border-2 ${config.borderColor} rounded-lg 
          shadow-2xl ${config.shadowColor}
          ring-1 ring-white/10
        `}
            style={{
                transform: `translateY(${index * -8}px)`,
                zIndex: 1000 - index,
            }}
        >
            {/* Accent line */}
            <motion.div
                className={`absolute top-0 left-0 right-0 h-1 ${config.accentColor}`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
            />

            {/* Main content */}
            <div className="relative p-4">
                {/* Header with icon and close button */}
                <div className="flex justify-between items-start gap-4 mb-3">
                    <div className="flex flex-1 items-start gap-3 min-w-0">
                        {/* Animated icon */}
                        <motion.div
                            variants={iconVariants}
                            initial="initial"
                            animate="animate"
                            className={`flex-shrink-0 ${config.iconColor} relative`}
                        >
                            <IconComponent className="w-6 h-6" />
                            {type === "success" && (
                                <motion.div
                                    className="-top-1 -right-1 absolute"
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.3 }}
                                >
                                    <Sparkles className="w-4 h-4 text-emerald-300" />
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Content */}
                        <motion.div
                            variants={contentVariants}
                            initial="initial"
                            animate="animate"
                            className="flex-1 space-y-2 min-w-0"
                        >
                            {/* Title */}
                            {title && (
                                <motion.div
                                    className={`text-base font-bold ${config.titleColor} leading-tight`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.4 }}
                                >
                                    {title}
                                </motion.div>
                            )}

                            {/* Message */}
                            <motion.div
                                className={`text-sm leading-relaxed ${config.messageColor}`}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: title ? 0.4 : 0.3, duration: 0.4 }}
                            >
                                {message}
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Animated close button */}
                    <motion.button
                        variants={closeButtonVariants}
                        initial="initial"
                        animate="animate"
                        whileHover="hover"
                        whileTap="tap"
                        onClick={handleClose}
                        className="flex-shrink-0 hover:bg-white/10 p-2 rounded-md transition-colors duration-200"
                    >
                        <X className="w-5 h-5 text-gray-400 hover:text-white transition-colors" />
                    </motion.button>
                </div>

                {/* Footer with countdown */}
                {(footer || (!persistent && remainingTime !== null)) && (
                    <motion.div
                        className={`flex items-center gap-2 text-sm ${config.footerColor} pt-2 border-t border-white/10`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.4 }}
                    >
                        <Clock className="w-4 h-4" />
                        <span className="truncate">
                            {persistent ? (
                                footer || "Click to close"
                            ) : remainingTime !== null ? (
                                <>
                                    {footer ? `${footer} • ` : ""}
                                    <motion.span
                                        key={Math.floor(remainingTime)}
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: 1 }}
                                        transition={{ duration: 0.2 }}
                                        className={Math.ceil(remainingTime) <= 3 ? "text-red-400 font-semibold" : "font-medium"}
                                    >
                                        Auto-closes in {Math.ceil(remainingTime)}s
                                    </motion.span>
                                </>
                            ) : (
                                footer
                            )}
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Persistent indicator */}
            {/* {persistent && (
                <motion.div
                    className="top-3 left-3 absolute bg-white/60 rounded-full w-3 h-3"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
            )} */}
        </motion.div>
    )
}
