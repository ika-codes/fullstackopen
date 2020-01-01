const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response, next) => {
	try {
		const blogs = await Blog.find({});
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

blogsRouter.post("/", async (request, response, next) => {
	const body = request.body;

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
		url: body.url,
		likes: body.likes === undefined ? 0 : body.likes
	});
	try {
		const savedBlog = await blog.save();
		response.status(201).json(savedBlog);
	} catch (error) {
		next(error);
	}
});

blogsRouter.delete("/:id", async (request, response, next) => {
	try {
		await Blog.findByIdAndRemove(request.params.id);
		response.status(204).end();
	} catch (error) {
		next(error);
	}
});

module.exports = blogsRouter;
