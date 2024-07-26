import { UserProvider } from "./auth/auth_context"

const AppProvider = ({ children }) => {
    
    return <UserProvider> {children} </UserProvider>
}

export default AppProvider