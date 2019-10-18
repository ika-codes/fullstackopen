import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const entries = [
    {
        name: "John Doe",
        number: "123"
    },
    {
        name: "Jane Doe",
        number: "456"
    }
];

ReactDOM.render(<App entries={entries} />, document.getElementById("root"));
