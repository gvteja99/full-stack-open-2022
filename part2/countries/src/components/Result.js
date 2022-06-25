const ListCountry = ({country}) => {
    return (
        <div>{country}</div>
    )
}

const ListLanguages = ({lang}) => {
    return (
        <li>{lang}</li>
    )
}

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
                <div>{filteredCountries.map(country => <ListCountry key = {country.name.official} country={country.name.common}/>)}</div>
        )

    } else if (filteredCountries.length == 1) {
        const country = filteredCountries[0]
        return (
            <div>
                <h1>
                    {country.name.common}
                </h1>
                <div>
                    capital {country.capital[0]}
                </div>
                <div>
                    area {country.area}
                </div>
                <div>
                    <h3>
                        languages:
                    </h3>
                </div>
                <div>
                    <ul>
                        {Object.values(country.languages).map(lang => <ListLanguages key={lang} lang={lang}/>)}
                    </ul>
                </div>
                <div>
                    <img 
                        src={country.flags.png}
                        alt={`Flag of ${country.name.common}`}
                        width={200}
                    />

                </div>
            </div>
        )



    } else if (filteredCountries.length == 0) {
        return (<div>No matches</div>)
    }

}

export default Result