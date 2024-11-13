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
  const { getData, addData, deleteData, updateData } = phonebook

  useEffect(() => {
    getData()
      .then(resp => {
        setPersons(resp)
        console.log(resp);
      })
  }, [])

  const findExistingName = (value) => !persons.some(person => person.name?.toLowerCase() === value.toLowerCase());
  const findExistingNumber = (value) => !persons.some(person => person.number === value);

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
    } else if (!findExistingName(newName) && findExistingNumber(newNumber)) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {

        const getId = persons.find(person => person.name.toLowerCase() === newName.toLowerCase())
        const updateNumber = { ...getId, number: newNumber }
        console.log(updateNumber);

        updateData(getId.id, updateNumber)
          .then(updatedPerson => { setPersons(persons.map(person => person.id !== getId.id ? person : updatedPerson)) })
      }

    } else {
      alert(`${newName} is already added to phonebook with same number`)
    }
  };

  const handleDelete = ({ id, name }) => {
    window.confirm(`Delete ${name} ?`)
      ? deleteData(id).then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      : console.log(`${name} not deleted !`);
  }

  const handleNameChange = (e) => {
    setNewName((e.target.value).trim())
  };
  const handleNumberChange = (e) => {
    setNewNumber((e.target.value).trim())
  };

  const handleFilter = e => {
    setFilteredName((e.target.value).trim())
  }
  const nameList = persons.filter(person => person.name?.toLowerCase().includes(filteredName?.toLowerCase()))

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
