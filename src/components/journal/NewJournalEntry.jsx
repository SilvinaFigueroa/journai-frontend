import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/auth/auth_context'
import weather from '../../hooks/weather'
import axios from 'axios'

const NewJournalEntry = () => {

    // get user data from context (token payload) and token for auth
    const { token, user } = useAuth()

    // Setting and handling Journal Entry and Mood from form fields
    const [entry, setEntry] = useState("")
    const [mood, setMood] = useState("")

    const handleMoodChange = (event) => {
        setMood(event.target.value)
    }

    const handleEntryChange = (event) => {
        setEntry(event.target.value)
    }

    const email = user.email
    console.log(`User email ${email}`)

    const location = user.location
    console.log(`Location ${location}`)

    // get weather data from api using the weather hook 
    const { weatherData } = weather(location);

    console.log(`Weather data ${weatherData}`)
    // ________________________________________________________________


    const handleSubmit = async (event) => {
        event.preventDefault() // prevent rendering when submiting form

        console.log(`Token being sent: ${token}`);

        try {
            const response = await axios.post('http://localhost:3000/journal/new', {
                email,
                content: entry,
                weatherData,
                inputMood: mood,
                location
            }, {
                headers: {
                    'x-auth-token': token,
                }
            })

            console.log(`Entry: ${response.data}`)

        } catch (err) {
            console.error(err)
        }
    }

    return (

        <>
            <form onSubmit={handleSubmit}>
                <div className='journalEntry'>
                    <textarea value={entry} onChange={handleEntryChange} placeholder='Tell me about your day...!' required />
                </div>
                <div>
                    <h3>Select your overall mood:</h3>
                    <label>
                        <input
                            type="radio"
                            value="Very Happy"
                            checked={mood === 'Very Happy'}
                            onChange={handleMoodChange}
                        />
                        Very Happy
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Happy"
                            checked={mood === 'Happy'}
                            onChange={handleMoodChange}
                        />
                        Happy
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Neutral"
                            checked={mood === 'Neutral'}
                            onChange={handleMoodChange}
                        />
                        Neutral
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Sad"
                            checked={mood === 'Sad'}
                            onChange={handleMoodChange}
                        />
                        Sad
                    </label>
                    <label>
                        <input
                            type="radio"
                            value="Very Sad"
                            checked={mood === 'Very Sad'}
                            onChange={handleMoodChange}
                        />
                        Very Sad
                    </label>
                </div>
                <button type='submit'>Save Entry</button>
            </form>
        </>

    )
}

export default NewJournalEntry