import React, { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newSearch, setNewSearch] = useState("");

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then(response => {
            setPersons(response.data);
        });
    }, []);

    const addPerson = event => {
        event.preventDefault();
        let checkName = persons.filter(
            x => x.name.toLowerCase() === newName.toLowerCase()
        );

        if (checkName.length === 0) {
            const personObject = {
                name: newName,
                number: newNumber
            };
            axios
                .post("http://localhost:3001/persons", personObject)
                .then(response => {
                    console.log(response);
                    setPersons(persons.concat(personObject));
                    setNewName("");
                    setNewNumber("");
                });
        } else {
            window.alert(`${newName} is already added to phonebook`);
        }
    };

    const handleNameChange = event => {
        setNewName(event.target.value);
    };

    const handleNumberChange = event => {
        setNewNumber(event.target.value);
    };

    const handleSearchChange = event => {
        setNewSearch(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={newSearch} onChange={handleSearchChange} />
            <h2>Add new entry</h2>
            <PersonForm
                onSubmit={addPerson}
                nameValue={newName}
                nameOnChange={handleNameChange}
                numberValue={newNumber}
                numberOnChange={handleNumberChange}
            />
            <h2>Numbers</h2>
            <Persons newSearch={newSearch} persons={persons} />
        </div>
    );
};

export default App;
