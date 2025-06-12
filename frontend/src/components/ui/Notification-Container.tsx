import { useNotifications } from "../../providers/Notification-Provider"
import Notification from "./Notification"
import { AnimatePresence } from "framer-motion"

export default function NotificationContainer() {
    const { notifications, removeNotification } = useNotifications()

    return (
        <div className="top-6 right-6 z-[9999] fixed max-w-md">
            <div className="flex flex-col-reverse space-y-0 space-y-reverse">
                <AnimatePresence mode="popLayout">
                    {notifications.map((notification, index) => (
                        <Notification key={notification.id} {...notification} index={index} onClose={removeNotification} />
                    ))}
                </AnimatePresence>
            </div>
        </div>
    )
}
