import Name from './Name'
import axios from 'axios'
import { useEffect } from 'react'




const Persons = ({persons, setPersons, newFilter}) => {

  const hook = () => {
    axios.get('http://localhost:3001/persons').then(response => {
                          const notes = response.data
                          setPersons(notes);
                        })
      
  }
  
  useEffect(hook, [])
  
  if (persons.length==0) {
    return (<div></div>)
  }

  return (<div>
    {persons
    .filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    .map(person => <Name key={person.id} name={person.name} number={person.number} />)}
    </div>
    )
}

export default Persons