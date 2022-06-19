const Filter = ({value, setNewFilter, persons}) => {
    
    const checkFilter = (event) => {
      event.preventDefault()
      setNewFilter('')
    }  
  
    const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
      persons.map(person => person.show = person.name.toLowerCase().includes(event.target.value.toLowerCase()))
    }
  
    return (
      <form onSubmit={checkFilter}>
        <div>
          filter shown with <input 
          value={value}
          onChange={handleFilterChange}
          />
        </div>
      </form>
    )
  }

export default Filter