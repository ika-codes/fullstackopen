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

    const handleSearchChange = event => {
        setNewSearch(event.target.value);
    };

    return (
        <div>
            <Filter value={newSearch} onChange={handleSearchChange} />
            <Countries newSearch={newSearch} countries={countries} />
        </div>
    );
}

export default App;
