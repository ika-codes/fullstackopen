const dummy = blogs => {
	return 1;
};

const totalLikes = blogs => {
	const sum = blogs.reduce(
		(accumulator, currentValue) => accumulator + currentValue.likes,
		0
	);
	return blogs.length === 0 ? 0 : sum;
};

module.exports = {
	dummy,
	totalLikes
};
