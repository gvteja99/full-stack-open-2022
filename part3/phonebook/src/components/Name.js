import contactServices from '../services/contact'
import { useEffect } from 'react'

const Name = ({person, setErrorMessage, setToggle}) => {
  
  let dtoggle = false;

  const deleteContact = () => {

    if (window.confirm(`Delete ${person.name} ?`)) {
      contactServices
      .deleteContact(person)
      .catch(error => {

        setErrorMessage(`Information of ${person.name} has already been removed from the server`)

        setTimeout(() => {
          setErrorMessage('')
        }, 3000)

      })

      setToggle(true)
    }

  }

  // useEffect(
  //   () => {
  //           contactServices.getAllContacts().then(notes => {setPersons(notes); dtoggle = false; console.log('deleteddddd')})
  //         }, [dtoggle]);


  return (
      <p>
        {person.name} {person.number} 
        <button onClick={deleteContact}>delete</button>
      </p>
    )
  }
  
export default Name