import ListCountry from "./ListCountry";
import ShowCountry from "./ShowCountry";

const Result = ({newFilter, countries}) => {

    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()));

    if (newFilter == '') {
        return (<div></div>)
    } else if (filteredCountries.length > 10) {
        return (
            <div>too many matches, specify another filter</div>
        )
    } else if (filteredCountries.length <= 10 && filteredCountries.length > 1) {
        return (
                <div>{filteredCountries.map(country => <ListCountry key = {country.name.official} country={country}/>)}</div>
        )

    } else if (filteredCountries.length == 1) {
        return (
                <div>
                    <ShowCountry country={filteredCountries[0]}/>
                </div>
        )
    } else if (filteredCountries.length == 0) {
        return (<div>No matches</div>)
    }

}

export default Result