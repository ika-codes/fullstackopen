const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const apiHelper = require("./api_helper");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(apiHelper.initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(apiHelper.initialBlogs[1]);
	await blogObject.save();
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("there are 2 blogs", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body.length).toBe(apiHelper.initialBlogs.length);
});

test("there is a property under id", async () => {
	const blogsAtEnd = await apiHelper.blogsInDb();

	const idsInBlogs = blogsAtEnd.map(n => n.id);
	expect(idsInBlogs).toBeDefined();
});

/*
test("a valid note can be added ", async () => {
	const newBlogPost = {
		_id: "5a422aa71b54a676234d1573",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
			"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	};

	await api
		.post("/api/blogs")
		.send(newBlogPost)
		.expect(201)
		.expect("Content-Type", /application\/json/);

	const response = await api.get("/api/blogs");

	const contents = response.body.map(r => r.title);

	expect(response.body.length).toBe(initialBlogs.length + 1);
	expect(contents).toContain("Go To Statement Considered Harmful");
});

test("blog without content is not added", async () => {
	const newBlog = {
		author: "Sam Smith"
	};

	await api
		.post("/api/blogs")
		.send(newBlog)
		.expect(400);

	const response = await api.get("/api/blogs");

	expect(response.body.length).toBe(initialBlogs.length);
}); */

afterAll(() => {
	mongoose.connection.close();
});
