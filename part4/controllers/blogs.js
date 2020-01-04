const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

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
	const user = await User.findById(body.userId);

	if (body.title === undefined) {
		return response.status(400).json({
			error: "Title is missing"
		});
	} else if (body.author === undefined) {
		return response.status(400).json({
			error: "Author is missing"
		});
	}

	const blog = new Blog({
		title: body.title,
		author: body.author,
		user: user._id,
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes
	});
	try {
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

module.exports = blogsRouter;
