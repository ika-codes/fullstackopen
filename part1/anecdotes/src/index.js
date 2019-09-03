import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = props => (
	<button onClick={props.handleClick}>{props.text}</button>
);

const Votes = props => <p>has {props.votes} votes</p>;

const MostVotes = props => {
	return (
		<div>
			<h1>Anecdote with most votes</h1>
			<p>{props.anecdotes[props.best]}</p>
			<p>has {props.votes} votes</p>
		</div>
	);
};

const App = props => {
	const pointsArray = Array.apply(null, new Array(anecdotes.length)).map(
		Number.prototype.valueOf,
		0
	);

	const [selected, setSelected] = useState(0);
	const [points, setPoints] = useState(pointsArray);

	const selectRandom = () => {
		const randomNumber = Math.floor(Math.random() * anecdotes.length);
		return setSelected(randomNumber);
	};

	const voteAnecdote = () => {
		const copy = [...points];
		copy[selected] += 1;
		setPoints(copy);
	};

	const best = points.indexOf(Math.max(...points));

	return (
		<div>
			<h1>Anecdote of the day</h1>
			<p>{props.anecdotes[selected]}</p>
			<Votes votes={points[selected]} />
			<Button text="vote" handleClick={voteAnecdote} />
			<Button text="next anecdote" handleClick={selectRandom} />
			<MostVotes
				best={best}
				anecdotes={props.anecdotes}
				votes={points[best]}
			/>
		</div>
	);
};

const anecdotes = [
	"If it hurts, do it more often",
	"Adding manpower to a late software project makes it later!",
	"The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
	"Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
	"Premature optimization is the root of all evil.",
	"Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
