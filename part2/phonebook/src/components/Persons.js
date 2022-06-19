import Name from './Name'

const Persons = ({persons}) => {
    return (<div>
      {persons.filter(person => person.show).map(person => <Name key={person.id} name={person.name} number={person.number} />)}
      </div>
      )
  }

export default Persons