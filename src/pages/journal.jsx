import { useAuth } from "../contexts/auth/auth_context"
import NewJournalEntry from "../components/journal/NewJournalEntry"
import SearchJournal from "../components/journal/SearchJournal"


const Journal = () => {
    const { logOut , user} = useAuth()

    const handleClick = () => {
        logOut()
    }
    

    return (
        <div>
            {/* conditional render for user name */}
            <h1>{user ? `${user.firstName}'s Journal` : 'Journal'}</h1>

            <NewJournalEntry/>
            <SearchJournal/>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Journal