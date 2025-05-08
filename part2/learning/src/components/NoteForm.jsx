import { useState } from "react"

export const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('');

    const addNote = e => {
      e.preventDefault()
      createNote({
        content: newNote,
        important: true
      })
      setNewNote('')
    }
  
  return (
    <form onSubmit={addNote} >
      <input
        value={newNote}
        onChange={({ target }) => setNewNote(target.value)}
        placeholder="new note"
      />
      <button type="submit">
        save
      </button>
    </form>
  )
}
