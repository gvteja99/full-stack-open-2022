import { useState } from 'react'
import Name from './components/Name'

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


  const containsObject = (obj, list) => {
    var i;
    for (i = 0; i < list.length; i++) {
        if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
            return true;
        }
    }

    return false;
  }

  const checkFilter = (event) => {
    event.preventDefault()
    setNewFilter('')
  }

  const addNote = (event) => {
    event.preventDefault()
    console.log("inside")
    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1,
      show: true
    }

    
    if (containsObject(nameObject, persons)){
      alert(`${newName} with the number ${newNumber} is already added to the phonebook`)
    } else {
      setPersons(persons.concat(nameObject))
    }
    setNewName('')
    setNewNumber('')
    setNewFilter('')
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
    persons.map(person => person.show = person.name.toLowerCase().includes(event.target.value.toLowerCase()))
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={checkFilter}>
        <div>
          filter shown with <input 
          value={newFilter}
          onChange={handleFilterChange}
          />
        </div>
      <h2>Phonebook</h2>
      </form>
      <form onSubmit={addNote}>
        <div>
          name: <input 
          value={newName}
          onChange={handleNameChange}
        />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={handleNumberChange}
        />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(person => person.show).map(person => <Name key={person.id} name={person.name} number={person.number} />)}
    </div>
  )
}

export default App
