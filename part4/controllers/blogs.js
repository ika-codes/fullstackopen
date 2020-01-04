const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Token request

const getTokenFrom = request => {
	const authorization = request.get("authorization");

	if (authorization && authorization.toLowerCase().startsWith("bearer")) {
		return authorization.substring(7);
	}

	return null;
};

// GET requests

blogsRouter.get("/", async (request, response, next) => {
	try {
		const blogs = await Blog.find({}).populate("user", {
			username: 1,
			name: 1
		});
		response.json(blogs.map(blog => blog.toJSON()));
	} catch (error) {
		next(error);
	}
});

blogsRouter.get("/:id", async (request, response, next) => {
	try {
		const blogById = await Blog.findById(request.params.id);

		if (blogById) {
			response.json(blogById.toJSON());
		} else {
			response.status(404).end();
		}
	} catch (error) {
		next(error);
	}
});

// POST requests

blogsRouter.post("/", async (request, response, next) => {
	const body = request.body;
	const token = getTokenFrom(request);

	if (body.title === undefined) {
		return response.status(400).json({
			error: "Title is missing"
		});
	} else if (body.author === undefined) {
		return response.status(400).json({
			error: "Author is missing"
		});
	}

	try {
		const decodedToken = jwt.verify(token, process.env.SECRET);
		if (!token || !decodedToken.id) {
			return response
				.status(401)
				.json({ error: "token missing or invalid" });
		}

		const user = await User.findById(decodedToken.id);

		const blog = new Blog({
			title: body.title,
			author: body.author,
			user: user._id,
			url: body.url,
			likes: body.likes === undefined ? 0 : body.likes
		});

		const savedBlog = await blog.save();
		user.blogs = user.blogs.concat(savedBlog._id);
		await user.save();
		response.status(201).json(savedBlog.toJSON());
	} catch (error) {
		next(error);
	}
});

// PUT requests

blogsRouter.put("/:id", async (request, response, next) => {
	const body = request.body;

	const blog = {
		likes: body.likes
	};

	try {
		const updatedBlog = await Blog.findByIdAndUpdate(
			request.params.id,
			blog,
			{ new: true }
		);
		response.status(200).json(updatedBlog.toJSON());
	} catch (error) {
		next(error);
	}
});

// DELETE requests

blogsRouter.delete("/:id", async (request, response, next) => {
	try {
		await Blog.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} catch (error) {
		next(error);
	}
});

const errorHandler = (error, request, response, next) => {
	console.error(error.message);

	if (error.name === "CastError" && error.kind === "ObjectId") {
		return response.status(400).send({ error: "malformatted id" });
	} else if (error.name === "ValidationError") {
		return response.status(400).json({ error: error.message });
	} else if (error.name === "JsonWebTokenError") {
		return response.status(401).json({
			error: "invalid token"
		});
	}

	next(error);
};

blogsRouter.use(errorHandler);

module.exports = blogsRouter;
