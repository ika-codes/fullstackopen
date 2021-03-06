const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const User = require("../models/user");
const apiHelper = require("./api_helper");

const api = supertest(app);

beforeEach(async () => {
	await Blog.deleteMany({});

	let blogObject = new Blog(apiHelper.initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(apiHelper.initialBlogs[1]);
	await blogObject.save();

	await User.deleteMany({});
	const user = new User({
		username: "root",
		name: "Weronika",
		password: "sekret"
	});
	await user.save();
});

describe("initial checks for blogs", () => {
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
});

describe("blogs addition", () => {
	test("a valid blog can be added ", async () => {
		const usersAtEnd = await apiHelper.usersInDb();

		const newBlogPost = {
			_id: "5a422aa71b54a676234d1573",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url:
				"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			likes: 5,
			__v: 0,
			userId: usersAtEnd[0].id
		};

		await api
			.post("/api/blogs")
			.send(newBlogPost)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");

		const contents = response.body.map(r => r.title);

		expect(response.body.length).toBe(apiHelper.initialBlogs.length + 1);
		expect(contents).toContain("Go To Statement Considered Harmful");
	});

	test("blog without likes returns value 0", async () => {
		const usersAtEnd = await apiHelper.usersInDb();

		const newBlogPost = {
			_id: "5a422aa71b54a676234d1573",
			title: "Go To Statement Considered Harmful",
			author: "Edsger W. Dijkstra",
			url:
				"http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
			__v: 0,
			userId: usersAtEnd[0].id
		};

		await api
			.post("/api/blogs")
			.send(newBlogPost)
			.expect(201)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");

		const contents = response.body.map(r => r.likes);

		expect(contents).toContain(0);
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

		expect(response.body.length).toBe(apiHelper.initialBlogs.length);
	});
});

describe("blogs deletion", () => {
	test("succeeds with status code 204 if id is valid", async () => {
		const blogsAtStart = await apiHelper.blogsInDb();
		const blogToDelete = blogsAtStart[0];

		await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

		const blogsAtEnd = await apiHelper.blogsInDb();

		expect(blogsAtEnd.length).toBe(apiHelper.initialBlogs.length - 1);

		const titles = blogsAtEnd.map(r => r.title);

		expect(titles).not.toContain(blogToDelete.title);
	});
});

describe("blogs updates", () => {
	test("Succeeds when providing new likes count", async () => {
		const updatedBlogPost = {
			id: "5a422aa71b54a676234d17f8",
			likes: 10
		};

		await api
			.put(`/api/blogs/${updatedBlogPost.id}`)
			.send(updatedBlogPost)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const response = await api.get("/api/blogs");

		const contents = response.body.map(r => r.likes);

		expect(contents).toContain(10);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
