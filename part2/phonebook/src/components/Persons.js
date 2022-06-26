import Name from './Name'
import { useEffect } from 'react'
import contactServices from '../services/contact'



const Persons = ({persons, setPersons, newFilter}) => {

  useEffect(
            () => {
                    contactServices.getAllContacts().then(notes => setPersons(notes))
                  }, [persons]);
  
  if (persons.length==0) {
    return (<div></div>)
  }

  return (<div>
    {persons
    .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    .map(person => <Name key={person.id} person={person} setPersons={setPersons} persons={persons}/>)}
    </div>
    )
}

export default Persons