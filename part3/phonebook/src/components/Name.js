import contactServices from '../services/contact'

const Name = ({person, setErrorMessage}) => {
  
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