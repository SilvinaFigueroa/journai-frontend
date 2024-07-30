import { Outlet, Navigate } from "react-router-dom"
import { useAuth } from '../../contexts/auth/auth_context'

const ProtectedRoutes = () => {

    // fetch the cookies from AuthContext
    const { token } = useAuth()

    // check cookie has a token and , otherwise redirect to home page
    return token? <Outlet/> : <Navigate to="/"/>  
}

export default ProtectedRoutes