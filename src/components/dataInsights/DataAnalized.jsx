import { useEffect, useState } from "react"

import geminiCall from "../../api/gemini.mjs"
import ReactMarkdown from 'react-markdown' // import markdown for formatting api response 

import { useAuth } from '../../contexts/auth/auth_context'

import styles from './DataAnalized.module.css'


const DataAnalized = ({ journals }) => {

    const { user } = useAuth()
    const [apiResponse, setApiResponse] = useState("") // api response 


    useEffect(() => {

        const apiCall = async () => {
            try {
                const response = await geminiCall({ user, journals });
                setApiResponse(response)

            } catch (err) {
                console.error(`Error from API call: ${err}`);

            }
        }

        apiCall()
    }, [journals]) // trigger when journals change


    return (

        <>
            <div className={styles.apiResponseContainer} >
                <ReactMarkdown>{apiResponse}</ReactMarkdown>
            </div>
        </>
    )
}

export default DataAnalized