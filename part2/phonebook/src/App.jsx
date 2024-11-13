import axios from 'axios'
import { useState } from 'react'
import { Title } from './components/Title'
import { Filter } from './components/Filter'
import { AddForm } from './components/AddForm'
import { List } from './components/List'
import { useEffect } from 'react'
import phonebook from './services/phonebook'

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filteredName, setFilteredName] = useState('')
  const { getData, addData, deleteData } = phonebook

  useEffect(() => {
    getData()
      .then(resp => {
        setPersons(resp)
        console.log(resp);
      })
  }, [])

  const findExistingName = (value) => !persons.some(person => person.name.toLowerCase() === value.toLowerCase());

  const handleAdd = (e) => {
    e.preventDefault()
    if (findExistingName(newName)) {

      const newPerson = {
        name: newName,
        number: newNumber,
        id: (persons.length + 1).toString() 
      }
      addData(newPerson)
      .then(resp => {
        setPersons(persons.concat(resp))
        setNewName('')
        setNewNumber('')
      })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  };
  const handleDelete = ({id,name}) => {
    window.confirm(`Delete ${name} ?`)
    ? deleteData(id).then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    : console.log(`${name} not deleted !`);
  }

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
      handleDelete={handleDelete}
        nameList={nameList}
      />
    </main>
  )
}

export default App
