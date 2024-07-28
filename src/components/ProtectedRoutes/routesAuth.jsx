import { Outlet } from "react-router-dom"
import { useAuth } from '../../contexts/auth/auth_context'

const ProtectedRoutes = () => {

    // fetch the cookies from AuthContext
    const { token } = useAuth()

    // check cookie has a token and , otherwise reject
    return token? <Outlet/> : <h1> Not Authorized -add redirect here- </h1>  
}

export default ProtectedRoutes