import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1, show: true },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2, show: true },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3, show: true },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4, show: true }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter value={newFilter} setNewFilter={setNewFilter} persons={persons}/>
      <h2>add a new</h2>
        <PersonForm 
          newName={newName} 
          newNumber={newNumber} 
          persons={persons}
          setPersons={setPersons}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} />
    </div>
  )
}

export default App
