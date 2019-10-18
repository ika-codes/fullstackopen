import React from "react";
import ReactDOM from "react-dom";

const Header = props => <h1>{props.title}</h1>;

const Total = props => {
    const { parts } = props;
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return <p>total of {total} exercises</p>;
};

const Part = props => (
    <p>
        {props.part.name} {props.part.exercises}
    </p>
);

const Content = props => {
    const { parts } = props;
    const rows = () => parts.map(part => <Part key={part.id} part={part} />);
    return <div>{rows()}</div>;
};

const Course = props => (
    <div>
        <Header title={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </div>
);

const App = () => {
    const course = {
        name: "Half Stack application development",
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3
            },
            {
                name: "Redux",
                exercises: 11,
                id: 4
            },
            {
                name: "MongoDB",
                exercises: 3,
                id: 5
            },
            {
                name: "Express",
                exercises: 8,
                id: 6
            }
        ]
    };

    return (
        <div>
            <Course course={course} />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
