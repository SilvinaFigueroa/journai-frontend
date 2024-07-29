import { useAuth } from "../contexts/auth/auth_context"
import NewJournalEntry from "../components/journal/NewJournalEntry"


const Journal = () => {
    const { logOut , user} = useAuth()

    const handleClick = () => {
        logOut()
    }
    

    return (
        <div>
            <h1>{user ? `${user.firstName}'s Journal` : 'Journal'}</h1>

            <NewJournalEntry/>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Journal