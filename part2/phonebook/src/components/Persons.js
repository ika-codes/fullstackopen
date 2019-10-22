import React from "react";
import Entry from "./Entry";

const Persons = props => {
    if (props.newSearch.length > 0) {
        let isMatch = props.persons.filter(function(entry) {
            return (
                entry.name
                    .toLowerCase()
                    .includes(props.newSearch.toLowerCase()) === true
            );
        });

        return isMatch.map(entry => (
            <Entry
                key={entry.id}
                entry={entry}
                handleDeletePerson={() => props.handleDeletePersonOf(entry.id)}
            />
        ));
    } else {
        return props.persons.map(entry => (
            <Entry
                key={entry.id}
                entry={entry}
                handleDeletePerson={() => props.handleDeletePersonOf(entry.id)}
            />
        ));
    }
};

export default Persons;
