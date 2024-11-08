import { useState } from 'react'
function App() {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  const findExistingName = (value) => !persons.some(person => person.name.toLowerCase() === value.toLowerCase());

  const handleAdd = (e) => {
    e.preventDefault()
    if (findExistingName(newName)) {

      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  };

  const handleFilter = e => {
    setFilteredName(e.target.value)
  }
  const nameList = persons.filter(person => person.name.toLowerCase().includes(filteredName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <section>
        <article>
          <label htmlFor="search">filter shown with </label>
          <input
          placeholder='My Mom'
          value={filteredName}  
          onChange={handleFilter}
          id="search" />   
        </article>
      </section>
      <h2>Add a new</h2>
      <form
      onSubmit={handleAdd}
      >
        <div>
          name: <input
          onChange={handleNameChange}
          value={newName}
          required
          />
        </div>
        <div>
          number: <input 
          onChange={handleNumberChange}
          value={newNumber}
          required
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {
          nameList.map(person => (
            <li key={person.id} style={{display:'flex', gap:'8px'}}>
            <p >{person.name}</p>
            <p>{person.number}</p>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default App
