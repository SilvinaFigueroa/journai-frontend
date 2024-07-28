import { createContext, useContext, useMemo, useState } from "react"
import { useCookies } from "react-cookie"
import axios from 'axios'

// use jwtDecode to get user ID from token
import { jwtDecode } from "jwt-decode"  // https://www.npmjs.com/package/jwt-decode

//Create Context
export const AuthContext = createContext()

//Create Context Provider 
export const UserProvider = ({ children }) => {

    //Create cookies
    const [cookies, setCookies, removeCookie] = useCookies()

    //Create state for saving user data 
    const [user, setUser] = useState(null)

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
            console.log(`response axios login call ${JSON.stringify(response)}`)
            setCookies('token', response.data)

            //decode token to get user ID
            console.log(JSON.stringify(`TOKEN login FE: : ${response.data.token}`))
            const decodedToken = jwtDecode(response.data.token)

            console.log(`login FE: decodedToken ${decodedToken}`)
            console.log(`login FE: User ID ${decodedToken.user.id}`)
            console.log(`login FE: Name ${decodedToken.user.name}`)
            console.log(`login FE: Location ${decodedToken.user.location}`)

            // Set user data from decoded token
            setUser({
                id: decodedToken.user.id,
                firstName: decodedToken.user.name,
                location: decodedToken.user.location
            })

        } catch (err) {
            console.error(err)
        }
    }

    // SignUp Function
    const signUp = async (formData) => {
        try {
            console.log(`formData to be sent: ${JSON.stringify(formData)}`)
            // Make a call to the backend                
            let response = await axios({
                method: 'POST',
                url: "http://localhost:3000/user/new", // backend url for user creation
                data: formData
            })

            // Set the recived token on the cookies
            setCookies('token', response.data.token)

            //decode token to get user ID
            console.log(JSON.stringify(response.data.token))
            const decodedToken = jwtDecode(response.data.token)

            console.log(JSON.stringify(decodedToken.user.id))

            // Set user data from decoded token
            setUser({
                id: decodedToken.user.id,
                firstName: decodedToken.user.name,
                location: decodedToken.user.location
            })

        } catch (err) {
            console.error(err)
        }
    }

    // LogOut Function
    const logOut = () => {
        // Remove cookies (use removeCookie -singular-)
        ['token'].forEach((obj) => removeCookie(obj))
        setUser(null) // removing user data
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

