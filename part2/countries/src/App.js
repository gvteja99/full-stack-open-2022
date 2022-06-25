import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Result from './components/Result'

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setNewFilter] = useState('');

  const hook = () => {
    axios.get('https://restcountries.com/v3.1/all').then(response => {
                          const notes = response.data
                          setCountries(notes);
                        })
      
  }
  
  useEffect(hook, []);


  return (      
    <div>
      <Filter value={newFilter} setNewFilter={setNewFilter} countries={countries}/>
      <Result newFilter={newFilter} countries={countries} />
    </div>
  )
}

export default App