import { useState } from "react"
import axios from "axios"

import { useAuth } from "../../contexts/auth/auth_context"
import calculateDateRange from '../../utils/calculateDateRange'

import DataAnalized from "./dataAnalized"


const DataSummarized = () => {
    // get user data and token from context
    const { user, token } = useAuth()
    // journals entry per data range selected
    const [journalsEntry, setJournalsEntry] = useState([])

    // Data range for the journal search and fetch 
    const [dataRange, setDataRange] = useState([])

    const handleRangeChange = (event) => {
        setDataRange(event.target.value);
    };

    const handleSearch = async (event) => {
        event.preventDefault()
        const { startDate, endDate } = calculateDateRange(dataRange)

        try {
            const response = await axios.get('http://localhost:3000/journal/search', {
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
            setJournalsEntry(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <>
            <h1>Data Insigths</h1>
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
                    <button type="submit">Get Insigths</button>
                </form>
            </div>
            <div>
                <DataAnalized journals={journalsEntry} />
            </div>
        </>
    )
}

export default DataSummarized