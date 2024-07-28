import { useState, useEffect} from 'react'
import { useAuth } from '../../contexts/auth/auth_context'

const journalEntry = () => {

    // get logged user from context
    const { user } = useAuth()

    const [journal, setJournal] = useState(
        userReference = "",
        content = "",
        weatherData = "",
        inputMood = "",
        location = ""
    )

    return (

        <>

        <h1>Hi {user} </h1>

        </>





    )
}

export default journalEntry