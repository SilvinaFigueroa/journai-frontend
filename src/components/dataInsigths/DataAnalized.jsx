import { useEffect, useState } from "react"

import geminiCall from "../../api/gemini.mjs"
import ReactMarkdown from 'react-markdown' // import markdown for formatting api response 

import { useAuth } from '../../contexts/auth/auth_context'

const DataAnalized = ({ journals }) => {

    const { user } = useAuth()
    console.log(JSON.stringify(user))
    const [apiResponse, setApiResponse] = useState("") // api response 
    const userName = user.firstName


    useEffect(() => {

        const apiCall = async () => {
            console.log(`API call triggered with journals: ${userName} - ${journals}`); // Debug log
            try {
                const response = await geminiCall({ userName , journals });
                console.log("API response:", response); // Debug log
                setApiResponse(response)

            } catch (err) {
                console.error(`Error from API call: ${err}`);

            }
        }

        apiCall()
    }, [journals]) // trigger when journals change


    return (
        <ReactMarkdown>{apiResponse}</ReactMarkdown>
    )
}

export default DataAnalized