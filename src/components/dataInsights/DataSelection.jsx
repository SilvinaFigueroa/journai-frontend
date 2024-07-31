import { useState } from "react"
import axios from "axios"

import { useAuth } from "../../contexts/auth/auth_context"
import calculateDateRange from '../../utils/calculateDateRange'

import DataAnalized from "./DataAnalized"

import styles from './DataSelection.module.css'


const DataSelection = () => {
    // get user data and token from context
    const { user, token } = useAuth()
    // journals entry per data range selected
    const [journalsEntry, setJournalsEntry] = useState("")

    // loading state to track the api call start/end process
    const [loading, setLoading] = useState(false)


    // Data range for the journal search and fetch 
    const [dataRange, setDataRange] = useState([])

    const handleRangeChange = (event) => {
        setDataRange(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault()
        const { startDate, endDate } = calculateDateRange(dataRange)

        try {
            setLoading(true) // Set loading to true before starting the fetch
            const response = await axios.get('https://journai-server.vercel.app/journal/search', {
                params: {
                    userReference: user.email,
                    startDate,
                    endDate,
                },
                headers: {
                    'x-auth-token': token
                }
            })
            // Update state with data fetch from the database

            //Error from Google Generative AI: request is not iterable
            // The response needs to be converted into a single string:

            const strJournals = response.data.map(journal =>
                `Date: ${new Date(journal.updatedAt).toLocaleDateString()},
                Content: ${journal.content}, Mood: ${journal.inputMood}, Location: ${journal.location}, 
                Weather: ${journal.weatherData}, Date: ${new Date(journal.createdAt).toLocaleDateString()}`
            ).join(" | ");

            // Update state with concatenated journal entries
            setJournalsEntry(String(strJournals))

            setLoading(false) // Set loading to false after the fetch

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <div className={styles.dataSelectionContainer}>
                <div className={styles.insightsContainer}>
                    <h1>Data Insights</h1>
                    <img src="/static/images/star.svg" alt="Star" className={styles.insightsImage} />
                </div>
                <p>
                    In this section, you can explore insights about your moods and emotions over time. <br />
                    Using advanced AI algorithms, we analyze your journal entries to find patterns,
                    summarize feelings, and provide you with a deeper understanding of your emotional state. <br />
                    <br />
                    Discover how your moods fluctuate and uncover the key factors influencing your wellbeing.
                </p>
                <hr />
                <h4>Select Data Range</h4>
                <form className={styles.dataSelectionForm} onSubmit={handleSearch}>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="lastWeek"
                                checked={dataRange === 'lastWeek'}
                                onChange={handleRangeChange}
                            />
                            Last Week
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="lastMonth"
                                checked={dataRange === 'lastMonth'}
                                onChange={handleRangeChange}
                            />
                            Last Month
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="last6Months"
                                checked={dataRange === 'last6Months'}
                                onChange={handleRangeChange}
                            />
                            Last 6 Months
                        </label>
                    </div>
                    <button type="submit">Get Insights</button>
                </form>
            </div>
            <div>
                {/* Conditional rendering: If journals data is fetched, pass it to DataAnalized component */}
                {loading? <p className={styles.loadingMessage} >Loading Data...</p> : journalsEntry.length > 0 && <DataAnalized journals={journalsEntry} />}
            </div>
        </>
    )
}

export default DataSelection