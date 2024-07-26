import { createContext, useContext, useMemo } from "react"
import { useCookies } from "react-cookie"
import axios from 'axios'

//Create Context
export const AuthContext = createContext()

//Create Context Provider 
export const UserProvider = ({ children }) => {

    //Create cookies
    const [cookies, setCookies, removeCookie] = useCookies()

    // Login Function
    const login = async (formData) => {

        try {
            // Make a call to the backend
            let response = await axios({
                method: 'POST',
                url: "http://localhost:3000/login", // backend url for login
                data: formData
            })
            // Set the recived token on the cookies
            setCookies('token', response.data.token)

        } catch (err) {
            console.error(err)
        }
    }

    // SignUp Function
    const signUp = async (formData) => {
        try {
            // Make a call to the backend                
            let response = await axios({
                method: 'POST',
                url: "http://localhost:3000/user/new", // backend url for user creation
                data: formData
            })

            // Set the recived token on the cookies
            setCookies('token', response.data.token)

        } catch (err) {
            console.error(err)
        }
    }

    // LogOut Function
    const logOut = () => {
        // Remove cookies (use removeCookie -singular-)
        ['token'].forEach((obj) => removeCookie(obj))
    }

    // With useMemo, the value object is only recreated when cookies changes
    const value = useMemo(() => ({
        cookies, login, logOut, signUp
    }), [cookies])
    // pass the cookie value (token) to the context provider
    return<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Invoke useContext in a function to be called in others components 
export const useAuth = () => {
    return useContext(AuthContext)
}