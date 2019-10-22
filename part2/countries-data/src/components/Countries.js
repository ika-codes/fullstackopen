import React from "react";
import Entry from "./Entry";
import Name from "./Name";

const Countries = props => {
    if (props.newSearch.length > 0) {
        let isMatch = props.countries.filter(function(entry) {
            return (
                entry.name
                    .toLowerCase()
                    .includes(props.newSearch.toLowerCase()) === true
            );
        });

        if (isMatch.length > 10) {
            return (
                <div>
                    <p>Too many matches, specify another filter.</p>
                </div>
            );
        } else if (isMatch.length <= 10 && isMatch.length > 1) {
            return isMatch.map(entry => (
                <Name
                    key={entry.alpha3Code}
                    showHandler={props.showHandler}
                    name={entry.name}
                />
            ));
        } else if (isMatch.length === 1) {
            return isMatch.map(entry => (
                <Entry key={entry.alpha3Code} entry={entry} />
            ));
        } else {
            return (
                <div>
                    <p>No matches found.</p>
                </div>
            );
        }
    } else {
        return (
            <div>
                <p>Please type in the country to see results.</p>
            </div>
        );
    }
};

export default Countries;
