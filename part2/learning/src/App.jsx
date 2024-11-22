import { useEffect, useState } from 'react'
import { Note } from './components/Note'
import noteService from './services/note'
import { Notification } from './components/Notificaction'
import { Footer } from './components/Footer'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  console.log('App', notes);

  const { getAll, create, update } = noteService

  useEffect(() => {
    console.log('effect')
    getAll()
      .then(response => {
        console.log(response);

        setNotes(response)
      })
      .catch(error => {
        console.log(error);

      })
  }, [])


  const handleNotesToShow = showAll
    ? notes
    : notes.filter(note => note.important)
  console.log(handleNotesToShow);


  const handleAdd = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: (notes.length + 1).toString()
    }
    create(noteObject)
      .then(resp => {
        setNotes(notes.concat(resp))
        setNewNote('')
      })

  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
    console.log(e.target.value);

  }

  const toggleImportanceOf = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = { ...note, important: !note.important }

    update(id, changedNote)
      .then(resp => {
        setNotes(notes.map(note => note.id !== id ? note : resp))
      })
      .catch(error => {
        console.log(error);

        setErrorMsg(
          `Note '${note.content}' was already removed from server`
        )
        setTimeout(() => {
          setErrorMsg(null)
        }, 5000)
        setNotes(notes.filter(n => n.id !== id))
      })
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {handleNotesToShow.map(note =>
          <Note
            key={note.id}
            toggleImportance={() => toggleImportanceOf(note.id)}
            note={note} />
        )}
      </ul>
      <form onSubmit={handleAdd} >
        <input
          value={newNote}
          onChange={handleNoteChange}
        />
        <button type="submit">
          save
        </button>
      </form>
      <Footer />
    </div>
  )
}

export default App
