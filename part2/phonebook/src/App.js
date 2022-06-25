import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([])

  const hook = () => {
    console.log('effect')
    axios.get('http://localhost:3001/persons').then(response => {
                          const notes = response.data
                          setPersons(notes);
                          console.log(notes)
                        })
      
  }
  
  useEffect(hook, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  console.log('persons', persons)

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
