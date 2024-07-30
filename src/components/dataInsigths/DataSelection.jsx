import { useState } from "react"
import axios from "axios"

import { useAuth } from "../../contexts/auth/auth_context"
import calculateDateRange from '../../utils/calculateDateRange'

import DataAnalized from "./DataAnalized"


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
            const response = await axios.get('https://journai-backend.onrender.com/journal/search', {
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
            <div>
                <form onSubmit={handleSearch}>
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
                    <button type="submit">Get Insights</button>
                </form>
            </div>
            <div>
                {/* Conditional rendering: If journals data is fetched, pass it to DataAnalized component */}
                {loading ? <p>Loading Data...</p> : journalsEntry.length > 0 && <DataAnalized journals={journalsEntry} />}
            </div>
        </>
    )
}

export default DataSelection