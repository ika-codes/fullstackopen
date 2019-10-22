import React from "react";

const Entry = ({ entry, handleDeletePerson }) => {
    return (
        <li>
            {entry.name} &ndash; {entry.number}
            <button onClick={handleDeletePerson}>Delete</button>
        </li>
    );
};

export default Entry;
