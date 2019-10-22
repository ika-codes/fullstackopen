import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newSearch, setNewSearch] = useState("");

    useEffect(() => {
        personsService.getAll().then(initialPersons => {
            setPersons(initialPersons);
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
            personsService.create(personObject).then(returnedPerson => {
                setPersons(persons.concat(returnedPerson));
                setNewName("");
                setNewNumber("");
            });
        } else {
            window.alert(`${newName} is already added to phonebook`);
        }
    };

    const deletePerson = id => {
        if (window.confirm("Do you really want to delete this entry?")) {
            personsService.deleteEntry(id).then(() => {
                setPersons(persons.filter(n => n.id !== id));
            });
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

    const handleDeletePersonOf = id => {
        deletePerson(id);
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
            <Persons
                newSearch={newSearch}
                persons={persons}
                handleDeletePersonOf={handleDeletePersonOf}
            />
        </div>
    );
};

export default App;
