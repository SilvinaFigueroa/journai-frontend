import { Outlet } from "react-router-dom"
import { auth } from '../../contexts/auth/auth_context'

const ProtectedRoutes = () => {

    // fetch the cookies from AuthContext
    const { cookies } = auth()

    // check cookie has a token and , otherwise reject
    return cookies.token? <Outlet/> : <h1> Not Authorized -add redirect here- </h1>  
}

export default ProtectedRoutes