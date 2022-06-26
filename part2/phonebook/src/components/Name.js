import contactServices from '../services/contact'
import { useEffect } from 'react'

const Name = ({person, setPersons, persons}) => {
  
  const deleteContact = () => {

    if (window.confirm(`Delete ${person.name} ?`)) {
      contactServices
      .deleteContact(person)
      .catch(error => {
        console.log('Delete Failed')
      })
      
    }

  }

  return (
      <p>
        {person.name} {person.number} 
        <button onClick={deleteContact}>delete</button>
      </p>
    )
  }
  
export default Name