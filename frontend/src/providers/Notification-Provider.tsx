import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type NotificationType = "success" | "error" | "warning" | "info"

export interface NotificationData {
    id: string
    type: NotificationType
    title?: string
    message: string
    footer?: string
    length?: number // undefined means persistent
    persistent?: boolean
}

interface NotificationContextType {
    notifications: NotificationData[]
    addNotification: (notification: Omit<NotificationData, "id">) => void
    removeNotification: (id: string) => void
    clearAll: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export function NotificationProvider({ children }: { children: ReactNode }) {
    const [notifications, setNotifications] = useState<NotificationData[]>([])

    const addNotification = useCallback((notification: Omit<NotificationData, "id">) => {
        const id = Math.random().toString(36).substr(2, 9)
        const newNotification: NotificationData = {
            ...notification,
            id,
            persistent: notification.persistent || !notification.length,
        }

        setNotifications((prev) => [...prev, newNotification])
    }, [])

    const removeNotification = useCallback((id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id))
    }, [])

    const clearAll = useCallback(() => {
        setNotifications([])
    }, [])

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
                clearAll,
            }}
        >
            {children}
        </NotificationContext.Provider>
    )
}

export function useNotifications() {
    const context = useContext(NotificationContext)
    if (!context) {
        throw new Error("useNotifications must be used within a NotificationProvider")
    }
    return context
}
