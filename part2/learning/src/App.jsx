import { useEffect, useState } from 'react'
import { Note } from './components/Note'
import noteService from './services/note'
import { Notification } from './components/Notificaction'
import { Footer } from './components/Footer'
import loginService from './services/login'
import { LoginForm } from './components/LoginForm'
import { NoteForm } from './components/NoteForm'

function App() {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [errorMsg, setErrorMsg] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)

  const { getAll, create, update } = noteService

  useEffect(() => {
    console.log('effect')
    getAll().then(response => {
      console.log(response);
      setNotes(response)
    })
      .catch(error => {
        console.log(error);
      })
  }, [])


  const handleLogin = async e => {
    e.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password
      })
      noteService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem(
        'loggedNoteAppUser', JSON.stringify(user)
      )
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMsg('Wrong credentials, please try again', error)
      setTimeout(() => {
        setErrorMsg(null)
      }, 4000)
    }
    console.log('Logging in with: ', username, password);
  }

  //verify the details of a user that already logged in
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
      console.log('User logged-in sucesfully');
    } else {
      console.log('User is not logged, please login');
    }

  }, [])

  const handleNotesToShow = showAll
    ? notes
    : notes.filter(note => note.important)


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
  const handleLogout = e => {
    e.preventDefault()
    window.localStorage.removeItem('loggedNoteAppUser')
    setUser(null)
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
const handleLoginVisible = () => {
  setLoginVisible(!loginVisible)
}

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMsg} />
      {
    loginVisible ? (
        user === null ? (
            <LoginForm
                handleLogin={handleLogin}
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleLoginVisible={handleLoginVisible} // Pasar la lógica para "Cancelar"
            />
        ) : (
            <div>
                <section className="userInfo">
                    <p>{user?.name} logged-in</p>
                    <button
                        onClick={handleLogout}
                        className="userInfo_logout"
                    >
                        logout
                    </button>
                </section>
                <NoteForm
                    handleAdd={handleAdd}
                    newNote={newNote}
                    handleNoteChange={handleNoteChange}
                />
            </div>
        )
    ) : (
        <button onClick={handleLoginVisible}>Log in</button>
    )
}

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

      <Footer />
    </div>
  )
}

export default App
