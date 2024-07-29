import { useAuth } from "../contexts/auth/auth_context"
import NewJournalEntry from "../components/journal/NewJournalEntry"
import SearchJournal from "../components/journal/SearchJournal"
import { useNavigate } from "react-router-dom"


const Journal = () => {

    const navigate = useNavigate()
    const { logOut , user} = useAuth()

    const handleClick = () => {
        logOut()
    }
    
    const redirectInsights = () => {
        navigate('/Insigths')
    }
    return (
        <div>
            {/* conditional render for user name */}
            <h1>{user ? `${user.firstName}'s Journal` : 'Journal'}</h1>

            <NewJournalEntry/>
            <SearchJournal/>
            <button onClick={redirectInsights}>View Insights</button>
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Journal