const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const apiHelper = require("./api_helper");

const api = supertest(app);

describe("when there is initially one user at db", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const user = new User({
			username: "root",
			name: "Weronika",
			password: "sekret"
		});
		await user.save();
	});

	test("creation succeeds with a fresh username", async () => {
		const usersAtStart = await apiHelper.usersInDb();

		const newUser = {
			username: "mluukkai",
			name: "Matti Luukkainen",
			password: "salainen"
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(200)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await apiHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

		const usernames = usersAtEnd.map(u => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test("cannot create duplicate user", async () => {
		const usersAtStart = await apiHelper.usersInDb();

		const newUser = {
			username: "root",
			name: "Matti Luukkainen",
			password: "salainen"
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400)
			.expect("Content-Type", /application\/json/);

		const usersAtEnd = await apiHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test("cannot create user without username", async () => {
		const usersAtStart = await apiHelper.usersInDb();

		const newUser = {
			name: "Matti Luukkainen",
			password: "salainen"
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400);

		const usersAtEnd = await apiHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test("cannot create user without password", async () => {
		const usersAtStart = await apiHelper.usersInDb();

		const newUser = {
			username: "root",
			name: "Matti Luukkainen"
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400);

		const usersAtEnd = await apiHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test("cannot create user with username shorter than 3 characters", async () => {
		const usersAtStart = await apiHelper.usersInDb();

		const newUser = {
			username: "ha",
			name: "Matti Luukkainen",
			password: "salainen"
		};

		await api
			.post("/api/users")
			.send(newUser)
			.expect(400);

		const usersAtEnd = await apiHelper.usersInDb();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});
});

afterAll(() => {
	mongoose.connection.close();
});
