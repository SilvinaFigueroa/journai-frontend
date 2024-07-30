import { useState } from 'react'
import { useAuth } from '../../contexts/auth/auth_context'
import axios from 'axios'

import styles from './Journal.module.css'

const JournalEntry = ({ journal, refreshData }) => {
  // journal: Contains the data for the journal entry
  // refreshData: function to Re-fetch data after deletion to update search

  // Create a state for the updated values, with the current value as default 
  const [editedContent, setEditedContent] = useState(journal.content);
  const [editedMood, setEditedMood] = useState(journal.inputMood);
  const [editedLocation, setEditedLocation] = useState(journal.location)

  // Boolean to manage the conditional rendering of the edit fields 
  const [edit, setEdit] = useState(false)

  const { token } = useAuth()

  const handleDelete = async () => {
    try {
      await axios.delete(`https://journai-backend.onrender.com/journal/delete/${journal._id}`,
        {
          headers: { 'x-auth-token': token }
        })
      console.log(`Record Deleted`)
      refreshData(); // Re-fetch data after deletion

    } catch (err) {
      console.error(err)

    }
  }

  const handleUpdate = async (event) => {
    event.preventDefault()

    try {

      await axios.put(`https://journai-backend.onrender.com/update/${journal._id}`,
        {
          content: editedContent,
          inputMood: editedMood,
          location: editedLocation
        },
        {
          headers: { 'x-auth-token': token }
        })

      console.log(`Record Updated`)
      refreshData(); // Re-fetch data after deletion
      setEdit(false) // Set value to false to hide the edit mode 

    } catch (err) {
      console.error(err)

    }
  }


  return (
    <>
      <div className={styles.journalEntry}>
        {/* Conditional Rendering for edit journal record */}
        {edit ? (
          <form className={styles.journalEntryEditForm} onSubmit={handleUpdate}>

            <label>
              Content:
              <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} required />
            </label>
            <label>
              Mood:
              <input value={editedMood} onChange={(e) => setEditedMood(e.target.value)} required />
            </label>
            <label>
              Location:
              <input value={editedLocation} onChange={(e) => setEditedLocation(e.target.value)} required />
            </label>

            <button type="submit">Save Editions</button>
            {/* When cancel edition, set value to false to hide the edit mode  */}
            <button type="button" onClick={() => setEdit(false)}>Cancel</button>
          </form>
        ) : (
          <div className={styles.journalField}>
            <p><strong>Content:</strong> {journal.content}</p>
            <p><strong>Mood:</strong> {journal.inputMood} <strong>Location:</strong> {journal.location} <strong>Weather:</strong> {journal.weatherData}</p>
            <p><strong>Date:</strong> {journal.createdAt.split('T')[0]}</p>
            {/* When click Edit Entry button, set edit value to true to show the edit mode  */}
            <button onClick={() => setEdit(true)}>Edit Entry</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        )}
      </div>
    </>
  )
}

export default JournalEntry