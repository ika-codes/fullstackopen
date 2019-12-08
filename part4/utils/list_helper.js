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

const favoriteBlog = blogs => {
	const mostLikes = blogs.reduce(
		(mostLikes, blog) => (mostLikes.likes > blog.likes ? mostLikes : blog),
		0
	);
	return mostLikes;
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog
};
