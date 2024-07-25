import { createContext, useContext, useMemo } from "react"
import { useCookies } from "react-cookie"
import axios from 'axios'

//Create Context
export const AuthContext = createContext()

//Create Context Provider

//Create Context Provider 
export default UserProvider({ children }){

    //Create cookies
    const [cookies, setCookies, removeCookies] = useCookies()


    // Login Function
    const login = async (formData) => {

        try {
            // Make a call to the backend
            let response = await axios({
                method: 'POST',
                data: formData
            })
            // Set the user token on the cookies
            setCookies('token', response.data.token)

        } catch (err) {
            console.error(err)
        }

        // SignUp Function
        const signUp = async (formData) => {
            try {

                // Make a call to the backend                
                let response = await axios({
                    method: 'POST',
                    url: "http://localhost:3000/login", // backend url for authentication
                    data: formData
                })

                // Set the user token on the cookies
                setCookies('token', response.data.token)

            } catch (err) {
                console.error(err)
            }
        }

    }

    // LogOut Function
    const logOut = () => {
        // Remove cookies (use removeCookie -singular-)
        ['token'].forEach((obj) => removeCookie(obj))
    }

    const value = useMemo(() => ({
        cookies, login, logOut, signUp
    }), [cookies])

    return
    <AuthContext.Provider value={ value }>{ children }</AuthContext.Provider>
}

// Invoke useContext in a function to be called in others components 
export const useAuth = ()=> {
    return useContext(AuthContext)
}