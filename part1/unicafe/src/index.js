import React, { useState } from "react";
import ReactDOM from "react-dom";

const Statistic = props => (
	<tr>
		<td>{props.text}</td>
		<td>{props.value}</td>
	</tr>
);

const Statistics = props => {
	if (props.total === 0) {
		return <div>the app is used by pressing the buttons</div>;
	}

	return (
		<div>
			<table>
				<tbody>
					<Statistic text="good" value={props.good} />
					<Statistic text="neutral" value={props.neutral} />
					<Statistic text="bad" value={props.bad} />
					<Statistic text="all" value={props.total} />
					<Statistic text="average" value={props.average} />
					<Statistic text="positive" value={props.positive} />
				</tbody>
			</table>
		</div>
	);
};

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

	const total = good + neutral + bad;
	const average = (good - bad) / total;
	const positive = (good / total) * 100 + "%";

	return (
		<div>
			<h1>give feedback</h1>
			<Button handleClick={increaseGood} text="good" />
			<Button handleClick={increaseNeutral} text="neutral" />
			<Button handleClick={increaseBad} text="bad" />
			<h1>statistics</h1>
			<Statistics
				total={total}
				good={good}
				neutral={neutral}
				bad={bad}
				average={average}
				positive={positive}
			/>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById("root"));
