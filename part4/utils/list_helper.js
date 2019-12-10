const _ = require("lodash");

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

const mostBlogs = blogs => {
	const totalByAuthors = _.countBy(blogs, "author");

	var authorsSorted = _.chain(totalByAuthors)
		.map(function(count, author) {
			return {
				author: author,
				blogs: count
			};
		})
		.orderBy("blogs", "desc")
		.value();

	return authorsSorted[0];
};

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs
};
