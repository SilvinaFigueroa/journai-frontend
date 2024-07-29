import { useState } from 'react'
import { useAuth } from '../../contexts/auth/auth_context'
import axios from 'axios'


const JournalEntry = ({ journal, refreshData}) => {
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
      <div>
        {/* Conditional Rendering for edit journal record */}
        {edit ? (
          <form onSubmit={handleUpdate}>
            <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} required />
            <input value={editedMood} onChange={(e) => setEditedMood(e.target.value)} required />
            <input value={editedLocation} onChange={(e) => setEditedLocation(e.target.value)} required />

            <button type="submit">Save Editions</button>
            {/* When cancel edition, set value to false to hide the edit mode  */}
            <button type="button" onClick={() => setEdit(false)}>Cancel</button>
          </form>
        ) : (
          <div>
            <p>{journal.content}</p>
            <p>{journal.inputMood}</p>
            <p>{journal.location}</p>
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