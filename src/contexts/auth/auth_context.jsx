import { createContext, useContext, useMemo, useState, } from "react"
import { useNavigate } from "react-router-dom"

import { useCookies } from "react-cookie"
import axios from 'axios'

// use jwtDecode to get user ID from token
import { jwtDecode } from "jwt-decode"  // https://www.npmjs.com/package/jwt-decode

//Create Context
export const AuthContext = createContext()

//Create Context Provider 
export const UserProvider = ({ children }) => {

    const navigate = useNavigate()

    //Create cookies
    const [cookies, setCookies, removeCookie] = useCookies(["token"])

    //Create state for saving user data 
    const [user, setUser] = useState(null)

    // Login Function
    const login = async (formData) => {

        try {
            // Make a call to the backend
            let response = await axios({
                method: 'POST',
                url: "https://journai-backend.onrender.com/login", // backend url for login
                data: formData
            })
            // Set the recived token on the cookies

            setCookies('token', response.data.token)

            //decode token to get user ID
            const decodedToken = jwtDecode(response.data.token)

            // Set user data from decoded token
            setUser({
                id: decodedToken.user.id,
                firstName: decodedToken.user.name,
                email: decodedToken.user.email,
                location: decodedToken.user.location
            })

        } catch (err) {
            console.error(err)
            // Including error throw to manage the IU messages
            throw new Error(err.response?.data?.errors[0]?.msg || 'Invalid login credentials');

        }
    }

    // SignUp Function
    const signUp = async (formData) => {
        try {
            // Make a call to the backend                
            let response = await axios({
                method: 'POST',
                url: "https://journai-backend.onrender.com/user/new", // backend url for user creation
                data: formData
            })

            // Set the recived token on the cookies
            setCookies('token', response.data.token)

            //decode token to get user ID
            const decodedToken = jwtDecode(response.data.token)

            // Set user data from decoded token
            setUser({
                id: decodedToken.user.id,
                firstName: decodedToken.user.name,
                email: decodedToken.user.email,
                location: decodedToken.user.location
            })

        } catch (err) {
            console.error(err)
            // Including error throw to manage the IU messages
            throw new Error(err.response?.data?.errors[0]?.msg || 'Invalid login credentials');

        }
    }

    // LogOut Function
    const logOut = () => {
        // Remove cookies (use removeCookie -singular-)
        ['token'].forEach((obj) => removeCookie(obj))
        setUser(null) // removing user data
        navigate('/')
    }


    // With useMemo, the value object is only recreated when the user or token changes
    const value = useMemo(() => ({
        login, logOut, signUp, token: cookies.token, user
    }), [cookies.token, user])

    // pass the cookie value (token) to the context provider
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Invoke useContext in a function to be called in others components 
export const useAuth = () => {
    return useContext(AuthContext)
}

