import { useAuth } from "../contexts/auth/auth_context"
import NewJournalEntry from "../components/journal/NewJournalEntry"
import SearchJournal from "../components/journal/SearchJournal"

import styles from '../components/journal/Journal.module.css'

const Journal = () => {

    const { user } = useAuth()


    return (
        <>
            <div className={styles.journalPage}>
                {/* conditional render for user name */}
                <h1>{user ? `${user.firstName}'s Journal` : 'Journal'}</h1>
            </div>
            <NewJournalEntry />
            <SearchJournal />
        </>

    )
}

export default Journal