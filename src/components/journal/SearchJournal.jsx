import { useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../contexts/auth/auth_context'

// Components
import JournalEntry from './journalEntry'
// Style
import styles from './Journal.module.css'


const SearchJournal = () => {

    const { token, user } = useAuth()
    // Date range for filtering journal entries 
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')

    // Search results : array of journal entries between the start/end date range
    const [searchResults, setSearchResults] = useState([])


    const handleSearch = async (event) => {
        event.preventDefault()
        try {
            const response = await axios.get('https://journai-backend.onrender.com/journal/search', {
                params: {
                    userReference: user.email,
                    startDate: new Date(startDate).toISOString().split('T')[0],
                    endDate: new Date(endDate).toISOString().split('T')[0]
                },
                headers: {
                    'x-auth-token': token
                }
            })
            // Update state with data fetch from the database
            setSearchResults(response.data)

        } catch (err) {
            console.error(err)
        }
    }

    // After Delete or Edit a record, refresh the search data
    const refreshData = async () => {
        try {
            const response = await axios.get('https://journai-backend.onrender.com/journal/search', {
                params: {
                    userReference: user.email,
                    startDate,
                    endDate
                },
                headers: {
                    'x-auth-token': token
                }
            })
            // Update state with data fetch from the database
            setSearchResults(response.data)

        } catch (err) {
            console.error(err)
        }
    }

    return (

        <>
            <div className={styles.journalContainer}>
                <h3>Search your journal entries by data range:</h3>
                <div className={styles.journalSearch}>
                    <form onSubmit={handleSearch}>
                        <label className={styles.dateLabel} > Date From : 
                            <input type='date' value={startDate}
                                onChange={(event) => setStartDate(event.target.value)} required /></label>
                        <label className={styles.dateLabel} > Date To :
                            <input type='date' value={endDate}
                                onChange={(event) => setEndDate(event.target.value)} required /></label>

                        <button type='submit' className={styles.searchButton}>Search</button>
                    </form>
                </div>
                <div className={styles.journalEntries}>
                    {searchResults.map(journal => (
                        // Use journalEntry component to display each journal 
                        <JournalEntry
                            key={journal._id} // used internally by React to keep track of elements in a list (not passed as props)
                            journal={journal}
                            token={token}
                            refreshData={refreshData}
                        />
                    ))}
                </div>
            </div>
        </>
    )
}

export default SearchJournal