const Filter = ({value, setNewFilter, countries}) => {
    
    const checkFilter = (event) => {
      event.preventDefault()
      setNewFilter('')
    }  
  
    const handleFilterChange = (event) => {
      setNewFilter(event.target.value)
      countries.map(country => country.show = country.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
    //   console.table(countries.map(country => country.name.common))
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