import { useAuth } from "../contexts/auth/auth_context"
// import JournalEntry from "../components/journal/journalEntry"


const Journal = () => {
    const { logOut , user} = useAuth()

    console.log(`User ${JSON.stringify(user.firstName)}`)

    const handleClick = () => {
        logOut()
    }
    

    return (
        <div>
            <h1>{user ? `${user.firstName}'s Journal` : 'Journal'}</h1>

            {/* <JournalEntry/> */}
            <button onClick={handleClick}>Logout</button>
        </div>
    )
}

export default Journal