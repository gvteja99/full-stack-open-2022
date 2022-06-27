import Name from './Name'
import { useEffect } from 'react'
import contactServices from '../services/contact'



const Persons = ({persons, setPersons, newFilter, setErrorMessage, toggle, setToggle}) => {

  useEffect(
            () => {
                    contactServices.getAllContacts().then(notes => {setPersons(notes); setToggle(false)})
                  }, [toggle]);
  
  if (persons.length==0) {
    return (<div></div>)
  }
  
  return (<div>
    {persons
    .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    .map(person => <Name key={person.id} person={person} setErrorMessage={setErrorMessage} setToggle={setToggle}/>)}
    </div>
    )
}

export default Persons