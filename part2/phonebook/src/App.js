import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

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
        <Persons persons={persons} setPersons={setPersons} newFilter={newFilter} />
    </div>
  )
}

export default App
