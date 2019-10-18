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

        return isMatch.map(entry => <Entry key={entry.name} entry={entry} />);
    } else {
        return props.persons.map(entry => (
            <Entry key={entry.name} entry={entry} />
        ));
    }
};

export default Persons;
