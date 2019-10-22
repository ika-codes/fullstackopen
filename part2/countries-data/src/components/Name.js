import React from "react";

const Name = ({ id, name, showHandler }) => {
    return (
        <div>
            <p>
                {name} <button onClick={() => showHandler(name)}>Show</button>
            </p>
        </div>
    );
};

export default Name;
