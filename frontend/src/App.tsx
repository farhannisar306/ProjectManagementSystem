import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import NotificationContainer from './components/ui/Notification-Container'
import { AuthenticationProvider } from './providers/Authentication-Provider'
import { NotificationProvider } from './providers/Notification-Provider'

function App() {
  return (
    <AuthenticationProvider>
      <NotificationProvider>
        <RouterProvider router={router} />
        <NotificationContainer />
      </NotificationProvider>
    </AuthenticationProvider>


  )
}

export default App
