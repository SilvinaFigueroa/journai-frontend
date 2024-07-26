import { auth } from "../contexts/auth/auth_context"


const Journal = () => {
    const { logOut } = auth()

    const handleClick = () => {
        logOut()
    }

    return (
        <div>
            <h2>Journal entry Page</h2>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Journal