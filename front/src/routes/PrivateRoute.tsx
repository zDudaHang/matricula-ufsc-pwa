import { Navigate, RouteProps } from 'react-router-dom'
import { JWT_LOCAL_STORAGE } from '../local-storage/model'
import { LOGIN_ROUTE } from './routes'

type PrivateRouteProps = Pick<RouteProps, 'children'>

export function PrivateRoute({ children }: PrivateRouteProps) {
  const accessToken = localStorage.getItem(JWT_LOCAL_STORAGE)

  if (!accessToken) {
    return <Navigate to={`/${LOGIN_ROUTE}`} />
  }

  return <>{children}</>
}
