import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'


const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [notificationMessage, setNotificationMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [toggle, setToggle] = useState(false)


  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={notificationMessage} />
        <Error message={errorMessage} />
        <Filter value={newFilter} setNewFilter={setNewFilter} persons={persons}/>
      <h2>add a new</h2>
        <PersonForm 
          newName={newName} 
          newNumber={newNumber} 
          persons={persons}
          setPersons={setPersons}
          setNewName={setNewName}
          setNewNumber={setNewNumber}
          setNotificationMessage={setNotificationMessage}
          setToggle={setToggle}
          setErrorMessage={setErrorMessage}
        />
      <h2>Numbers</h2>
        <Persons persons={persons} setPersons={setPersons} newFilter={newFilter} setErrorMessage={setErrorMessage} toggle={toggle} setToggle={setToggle}/>
    </div>
  )
}

export default App
