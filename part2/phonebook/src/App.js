import React, { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./services/persons";

const App = () => {
    const [persons, setPersons] = useState([]);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [newSearch, setNewSearch] = useState("");
    const [notificationMessage, setNotificationMessage] = useState(null);
    const [notificationType, setNotificationType] = useState(null);

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
                setNotificationMessage(
                    `${newName} was added to the phonebook.`
                );
                setNotificationType("success");
                setTimeout(() => {
                    setNotificationMessage(null);
                }, 5000);
            });
        } else {
            if (
                window.confirm(
                    `${newName} is already added to phonebook. Would you like to replace the old number with a new one?`
                )
            ) {
                const person = persons.find(n => n.name === newName);
                const changedPerson = { ...person, number: newNumber };
                let id = person.id;
                personsService
                    .update(id, changedPerson)
                    .then(returnedPerson => {
                        setPersons(
                            persons.map(person =>
                                person.id !== id ? person : returnedPerson
                            )
                        );
                        setNewName("");
                        setNewNumber("");
                        setNotificationMessage(
                            `${newName}'s number has been updated to ${newNumber}.`
                        );
                        setNotificationType("success");
                        setTimeout(() => {
                            setNotificationMessage(null);
                        }, 5000);
                    })
                    .catch(error => {
                        setNotificationMessage(
                            `This entry has already been removed from the phonebook. Cannot edit the number.`
                        );
                        setNotificationType("error");
                        setTimeout(() => {
                            setNotificationMessage(null);
                        }, 5000);
                        setPersons(persons.filter(n => n.id !== id));
                    });
            }
        }
    };

    const deletePerson = id => {
        if (window.confirm("Do you really want to delete this entry?")) {
            personsService
                .deleteEntry(id)
                .then(() => {
                    setPersons(persons.filter(n => n.id !== id));
                    setNotificationMessage(
                        `Entry has been removed from the phonebook.`
                    );
                    setNotificationType("success");
                    setTimeout(() => {
                        setNotificationMessage(null);
                    }, 5000);
                })
                .catch(error => {
                    setNotificationMessage(
                        `This entry has already been removed from the phonebook.`
                    );
                    setNotificationType("error");
                    setTimeout(() => {
                        setNotificationMessage(null);
                    }, 5000);
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
            <Notification
                message={notificationMessage}
                type={notificationType}
            />
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
