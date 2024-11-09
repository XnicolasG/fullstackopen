import axios from 'axios'
import { useState } from 'react'
import { Title } from './components/Title'
import { Filter } from './components/Filter'
import { AddForm } from './components/AddForm'
import { List } from './components/List'
import { useEffect } from 'react'
function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')

  useEffect(()=>{
    axios
    .get("http://localhost:3001/persons")
    .then(promise =>{
      setPersons(promise.data)
      console.log(promise.data);
    })
  },[])

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
