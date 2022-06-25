import { useState, useEffect } from 'react'
import axios from 'axios'

const GetWeather = ({country}) => {
    const [weatherData, setWeatherData] = useState([]);
    const params = new URLSearchParams([
        ['units', 'metric'],
        ['lat', country.latlng[0]], 
        ['lon', country.latlng[1]], 
        ['appid', process.env.REACT_APP_WEATHER_API_KEY]
        ]);

    
    const hook = () => {
        axios.get(
            'https://api.openweathermap.org/data/2.5/weather', {params}
            ).then(response => {setWeatherData(response.data)})
    }
    
    useEffect(hook, []);

    if (weatherData.length===0) {
        return <div></div>
    }

    return (
        <div>
            <div>
                <h2>
                    {`Weather in ${country.capital[0]}`}
                </h2>
            </div>
            <div>
                {`temperature ${weatherData.main.temp}`} 
            </div>
            <div>
                <img 
                    src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                    alt={`${weatherData.weather[0].description}`}
                    width={100}
                />
            </div>
            <div>
                {`wind ${weatherData.wind.speed} m/s`} 
            </div>
        </div>
    )
}

export default GetWeather