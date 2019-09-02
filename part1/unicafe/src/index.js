import React, { useState } from "react";
import ReactDOM from "react-dom";

const Display = props => (
	<div>
		{props.text} {props.value}
	</div>
);

const Button = props => (
	<button onClick={props.handleClick}>{props.text}</button>
);

const App = () => {
	// save clicks of each button to own state
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	const increaseGood = () => setGood(good + 1);

	const increaseNeutral = () => setNeutral(neutral + 1);

	const increaseBad = () => setBad(bad + 1);

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={increaseGood} text="good" />
			<Button handleClick={increaseNeutral} text="neutral" />
			<Button handleClick={increaseBad} text="bad" />
			<h1>statistics</h1>
			<Display text="good" value={good} />
			<Display text="neutral" value={neutral} />
			<Display text="bad" value={bad} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
