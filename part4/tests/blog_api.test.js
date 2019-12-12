const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

const initialBlogs = [
	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url:
			"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	}
];

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
});

test("blogs are returned as json", async () => {
	await api
		.get("/api/blogs")
		.expect(200)
		.expect("Content-Type", /application\/json/);
});

test("there are 2 notes", async () => {
	const response = await api.get("/api/blogs");

	expect(response.body.length).toBe(initialBlogs.length);
});

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
});

afterAll(() => {
	mongoose.connection.close();
});
