import useRouteElements from './useRouteElements'

export default function App() {
  const routeElents = useRouteElements()
  return <div>{routeElents}</div>
}
