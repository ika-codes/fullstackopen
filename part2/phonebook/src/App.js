import React, { useState } from "react";
import Entry from "./components/Entry";

const App = props => {
    const [persons, setPersons] = useState(props.entries);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");

    const rows = () =>
        persons.map(entry => <Entry key={entry.name} entry={entry} />);

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
            setPersons(persons.concat(personObject));
            setNewName("");
            setNewNumber("");
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

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number:{" "}
                    <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>{rows()}</ul>
        </div>
    );
};

export default App;
