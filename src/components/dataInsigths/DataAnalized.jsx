import { useEffect, useState } from "react"

import geminiCall from "../../api/gemini.mjs"
import ReactMarkdown from 'react-markdown' // import markdown for formatting api response 

import { useAuth } from '../../contexts/auth/auth_context'


const DataAnalized = ({journals}) => {

    const { user } = useAuth()
    const [apiResponse, setApiResponse] = useState("") // api response 

useEffect(() => {

    const apiCall = async () => {
        try {
            const response = await geminiCall({ firstName: user.firstName , journals });
            setApiResponse(response)

        } catch (err) {
            console.error(err)
        }
    }

    apiCall()
}, [journalsEntry]) // trigger when journalsEntry change


  return (
    <ReactMarkdown>{apiResponse}</ReactMarkdown>
  )
}

export default DataAnalized