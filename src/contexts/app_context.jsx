import { UserProvider } from "./auth/auth_context"

// AppProvider will hold all the userContext provider in the application 
const AppProvider = ({ children }) => {
    
    return <UserProvider> {children} </UserProvider>
}

export default AppProvider