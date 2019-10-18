import React, { useState } from "react";

const Entry = ({ entry }) => {
    return (
        <li>
            {entry.name} &ndash; {entry.number}
        </li>
    );
};

export default Entry;
