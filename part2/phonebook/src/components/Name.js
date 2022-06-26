import contactServices from '../services/contact'

const Name = ({person}) => {
  
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