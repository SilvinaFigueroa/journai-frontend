import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/auth/auth_context'
import weather from '../../hooks/weather'
import axios from 'axios'

import styles from './Journal.module.css'


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
            const response = await axios.post('https://journai-backend.onrender.com/journal/new', {
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
            <div className={styles.journalContainer}>
                <form className={styles.journalForm} onSubmit={handleSubmit}>
                    <div className='journalEntry'>
                        <textarea value={entry} onChange={handleEntryChange} placeholder='Tell me about your day...!' required />
                    </div>
                    <h3>How are you feeling overall today?</h3>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="Very Happy"
                                checked={mood === 'Very Happy'}
                                onChange={handleMoodChange}
                            />
                            <img src='src/images/winking.png' alt="Very Happy" />
                            Very Happy
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Happy"
                                checked={mood === 'Happy'}
                                onChange={handleMoodChange}
                            />
                            <img src='src/images/laughing.png' alt="Happy" />
                            Happy
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Neutral"
                                checked={mood === 'Neutral'}
                                onChange={handleMoodChange}
                            />
                            <img src='src/images/no-expression.png' alt="Neutral" />
                            Neutral
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Sad"
                                checked={mood === 'Sad'}
                                onChange={handleMoodChange}
                            />
                            <img src='src/images/crying.png' alt="Sad" />
                            Sad
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Angry"
                                checked={mood === 'Angry'}
                                onChange={handleMoodChange}
                            />
                            <img src='src/images/annoyed.png' alt="Angry" />
                            Angry
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Tired"
                                checked={mood === 'Tired'}
                                onChange={handleMoodChange}
                            />
                            <img src='src/images/sleepy.png' alt="Sleepy" />
                            Tired
                        </label>
                    </div>
                    <button type='submit'>Save Entry</button>
                </form>
            </div>
        </>

    )
}

export default NewJournalEntry