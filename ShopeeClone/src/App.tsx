import useRouteElements from './useRouteElements'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function App() {
  const routeElents = useRouteElements()
  return (
    <div>
      {routeElents}
      <ToastContainer />
    </div>
  )
}
