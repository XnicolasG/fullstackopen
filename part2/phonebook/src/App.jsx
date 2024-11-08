import { useState } from 'react'
import { Title } from './components/Title'
import { Filter } from './components/Filter'
import { AddForm } from './components/AddForm'
import { List } from './components/List'
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
    <main style={{ margin: '0px 10px' }}>
      <Title title='Phonebook' />
      <Filter
        filteredName={filteredName}
        handleFilter={handleFilter}
      />
      <Title title='Add a new' />
      <AddForm
        handleAdd={handleAdd}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />
      <Title title='Numbers' />
      <List
        nameList={nameList}
      />
    </main>
  )
}

export default App
