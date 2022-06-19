const PersonForm = ({newName, newNumber, persons, setPersons, setNewName, setNewNumber}) => {

    const containsObject = (obj, list) => {
      var i;
      for (i = 0; i < list.length; i++) {
          if (JSON.stringify(list[i]) === JSON.stringify(obj)) {
              return true;
          }
      }
  
      return false;
    }
  
  
    const addNote = (event) => {
      event.preventDefault()
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
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
    
    return (      
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
    )
  }

export default PersonForm