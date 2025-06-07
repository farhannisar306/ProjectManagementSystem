import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
import { NotificationProvider } from './providers/notification-provider'
import NotificationContainer from './components/ui/Notification-Container'
//import { useAuthTokenStore } from './stores/TokenStore'

function App() {
  //const { token } = useAuthTokenStore();
  return (
    <NotificationProvider>
      <RouterProvider router={router} />
      <NotificationContainer />
    </NotificationProvider>

  )
}

export default App
