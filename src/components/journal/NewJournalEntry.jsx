import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/auth/auth_context'
import axios from 'axios'
import weatherApi from '../../api/weather.mjs'

import styles from './Journal.module.css'


const NewJournalEntry = () => {

    // get user data from context (token payload) and token for auth
    const { token, user } = useAuth()

    // Setting and handling Journal Entry and Mood from form fields
    const [entry, setEntry] = useState("")
    const [mood, setMood] = useState("")

    // create a sucess message to display to the user 
    const [successMessage, setSuccessMessage] = useState('');

    const handleMoodChange = (event) => {
        setMood(event.target.value)
    }

    const handleEntryChange = (event) => {
        setEntry(event.target.value)
    }

    const email = user.email

    const location = user.location
    console.log(`Location ${location}`)

    // ________________________________________________________________


    const handleSubmit = async (event) => {
        event.preventDefault() // prevent rendering when submiting form

        try {

            const weatherData = await weatherApi({ city: location })
            console.log(`Weather data: ${weatherData}`)

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

            setSuccessMessage('Journal entry saved successfully!');
            // Clear the form fields
            setEntry('');
            setMood('');

        } catch (err) {
            console.error(err)
            setSuccessMessage('Failed to save the journal entry. Please try again.');
        }
    }

    return (

        <>
            <div className={styles.journalContainer}>
                <p>Please use the form below to record your thoughts and feelings. This will help you track your mood and reflect on your experiences.</p>
                <form className={styles.journalForm} onSubmit={handleSubmit}>
                    <div className='journalEntry'>
                        <textarea value={entry} onChange={handleEntryChange} placeholder='Tell me about your day...!' required />
                        <p className={styles.instructions}>Enter detailed thoughts. This can include events, feelings, and anything else you want to document.</p>
                        </div>
                    <h3>How are you feeling overall today?</h3>
                    <p className={styles.instructions}>Select the emoji that best represents your overall mood for the day.</p>
                    <div className={styles.radioGroup}>
                        <label>
                            <input
                                type="radio"
                                value="Very Happy"
                                checked={mood === 'Very Happy'}
                                onChange={handleMoodChange}
                            />
                            <img src={"public/static/images/winking.png"} alt="Very Happy" />
                            Very Happy
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Happy"
                                checked={mood === 'Happy'}
                                onChange={handleMoodChange}
                            />
                            <img src={"public/static/images/laughing.png"} alt="Happy" />
                            Happy
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Neutral"
                                checked={mood === 'Neutral'}
                                onChange={handleMoodChange}
                            />
                            <img src={"public/static/images/no-expression.png"} alt="Neutral" />
                            Neutral
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Sad"
                                checked={mood === 'Sad'}
                                onChange={handleMoodChange}
                            />
                            <img src={"public/static/images/crying.png"} alt="Sad" />
                            Sad
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Angry"
                                checked={mood === 'Angry'}
                                onChange={handleMoodChange}
                            />
                            <img src={"public/static/images/annoyed.png"} alt="Angry" />
                            Angry
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="Tired"
                                checked={mood === 'Tired'}
                                onChange={handleMoodChange}
                            />
                            <img src={"public/static/images/sleepy.png"} alt="Sleepy" />
                            Tired
                        </label>
                    </div>
                    <button type='submit'>Save Entry</button>
                </form>
                {/* conditional rendering a sucess message */}
                {successMessage && (
                    <div className={styles.successMessage}>{successMessage}</div>
                )}
            </div>
        </>

    )
}

export default NewJournalEntry