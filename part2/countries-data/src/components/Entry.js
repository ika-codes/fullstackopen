import React from "react";

const Entry = ({ entry }) => {
    const languages = () =>
        entry.languages.map(language => (
            <li key={language.iso639_2}>{language.name}</li>
        ));

    return (
        <div>
            <h1>{entry.name}</h1>
            <p>capital: {entry.capital}</p>
            <p>population: {entry.population}</p>
            <h3>languages</h3>
            <ul>{languages()}</ul>
            <img src={entry.flag} alt={entry.name} height="150" width="150" />
        </div>
    );
};

export default Entry;
