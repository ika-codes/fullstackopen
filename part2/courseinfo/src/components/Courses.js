import React from "react";

const Header = props => <h1>{props.title}</h1>;

const Total = props => {
    const { parts } = props;
    const total = parts.reduce((sum, part) => sum + part.exercises, 0);
    return (
        <p>
            <strong>total of {total} exercises</strong>
        </p>
    );
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

const Courses = props => {
    const { courses } = props;
    const courseRows = () =>
        courses.map(course => <Course key={course.id} course={course} />);
    return <div>{courseRows()}</div>;
};

const Course = props => (
    <div>
        <Header title={props.course.name} />
        <Content parts={props.course.parts} />
        <Total parts={props.course.parts} />
    </div>
);

export default Courses;
