import React from "react";

const PersonForm = props => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                name:{" "}
                <input value={props.nameValue} onChange={props.nameOnChange} />
            </div>
            <div>
                number:
                <input
                    value={props.numberValue}
                    onChange={props.numberOnChange}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    );
};

export default PersonForm;
