import { useState } from 'react'
function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleAdd = (e) => {
    e.preventDefault()
    const newPerson = {
      name: newName
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
  };
  
  const handleInputChange = (e) => {
    setNewName(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form
      onSubmit={handleAdd}
      >
        <div>
          name: <input
          onChange={handleInputChange}
          value={newName}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          persons.map(person => (
            <p key={person.name}>{person.name}</p>
          ))
        }
      </ul>
    </div>
  )
}

export default App
