import { RouterProvider } from 'react-router-dom'
import router from './routes/routes'
//import { useAuthTokenStore } from './stores/TokenStore'

function App() {
  //const { token } = useAuthTokenStore();
  return (
    <RouterProvider router={router} />
  )
}

export default App
