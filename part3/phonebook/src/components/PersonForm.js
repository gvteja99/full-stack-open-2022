import contactServices from '../services/contact'
import { useEffect } from 'react'

const PersonForm = ({newName, newNumber, persons, setPersons, setNewName, setNewNumber, setNotificationMessage, setToggle, setErrorMessage}) => {

    const containsObject = (obj, list) => {
      var i;
      for (i = 0; i < list.length; i++) {
          if (list[i]["name"] === obj["name"]) {
            return list[i]["number"] === obj["number"]?"exists":list[i].id;
          }           
      }
      return "add";
    }

    let toggle = false;
  
    const addNote = (event) => {
      event.preventDefault()

      const max = 100000000000000000;
      const nameObject = {
        id: Math.floor(Math.random() * (max) ),
        name: newName,
        number: newNumber,
      }
 
      const hasObject = containsObject(nameObject, persons)
      if (hasObject === "exists") { 
        alert(`${newName} with the number ${newNumber} is already added to the phonebook`)
      } else if (hasObject === "add") {
        contactServices.createContact(nameObject).then(contacts => {
          setPersons(persons.concat(contacts))
          setNewName('')
          setNewNumber('')

          setNotificationMessage(`Added ${newName}`)

          setTimeout(() => {
            setNotificationMessage('')
          }, 3000)

        })
        .catch(error => {
          setErrorMessage(error.response.data.error)

          setTimeout(() => {
            setErrorMessage('')
          }, 3000)

        })

      } else {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          contactServices.updateContact({ ...nameObject, id: hasObject}).then(contact => {
            setPersons(persons.map(person => person.id !== hasObject ? person : contact))
            setNewName('')
            setNewNumber('')  
            
            setNotificationMessage(`Updated ${newName}`)

            setTimeout(() => {
              setNotificationMessage('')
            }, 3000)
          })
          .catch(error => {
            setErrorMessage(error.response.data.error)

            setTimeout(() => {
              setErrorMessage('')
            }, 3000)

          })
        }
      } 
      setToggle(true);
    }
  
    const handleNameChange = (event) => {
      setNewName(event.target.value)
    }
  
    const handleNumberChange = (event) => {
      setNewNumber(event.target.value)
    }
    
    useEffect(
      () => {
              contactServices.getAllContacts().then(notes => {setPersons(notes); toggle = false})
            }, [toggle]);

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