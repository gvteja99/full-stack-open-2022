import { useState, useEffect } from 'react'
import ShowCountry from "./ShowCountry";

const ListCountry = ({country}) => {
    const countryName = country.name.common
    const [show, setShow] = useState('show');
    
    const handleClick = () => {
        setShow(show=='show'?'hide':'show')
      }
    
    if (show == 'show'){
        return (
            <div>
                {countryName} <button onClick={handleClick}>{show}</button>  
            </div>
        )
    } else {
        return (
            <div>
                {countryName} <button onClick={handleClick}>{show}</button>  
                <div>
                    <ShowCountry country={country}/>
                </div>
            </div>

        )
    }
}

export default ListCountry