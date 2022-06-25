import ListLanguages from "./ListLanguages";

const ShowCountry = ({country}) => {
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
}

export default ShowCountry