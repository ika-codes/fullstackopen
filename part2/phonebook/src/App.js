import React, { useState } from "react";
import Entry from "./components/Entry";

const App = props => {
    const [persons, setPersons] = useState(props.entries);
    const [newName, setNewName] = useState("");

    const rows = () =>
        persons.map(entry => <Entry key={entry.name} entry={entry} />);

    const addPerson = event => {
        event.preventDefault();
        const personObject = {
            name: newName,
            number: ""
        };
        setPersons(persons.concat(personObject));
        setNewName("");
    };

    const handleNameChange = event => {
        setNewName(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>{rows()}</ul>
            <div>debug: {newName}</div>
        </div>
    );
};

export default App;
