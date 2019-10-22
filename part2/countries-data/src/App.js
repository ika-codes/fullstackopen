import React, { useState, useEffect } from "react";
import countriesService from "./services/countries";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

function App() {
    const [countries, setCountries] = useState([]);
    const [newSearch, setNewSearch] = useState("");

    useEffect(() => {
        countriesService.getAll().then(initialCountries => {
            setCountries(initialCountries);
        });
    }, []);

    const showSpecificCountry = name => {
        const selectedCountry = countries.filter(function(entry) {
            return entry.name === name;
        });
        setCountries(selectedCountry);
    };

    const showHandler = name => {
        showSpecificCountry(name);
    };

    const handleSearchChange = event => {
        setNewSearch(event.target.value);
        countriesService.getAll().then(initialCountries => {
            setCountries(initialCountries);
        });
    };

    return (
        <div>
            <Filter value={newSearch} onChange={handleSearchChange} />
            <Countries
                newSearch={newSearch}
                countries={countries}
                showHandler={showHandler}
            />
        </div>
    );
}

export default App;
