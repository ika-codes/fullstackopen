const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const apiHelper = require("./api_helper");

const api = supertest(app);

describe("when there is initially one user at db", () => {
	beforeEach(async () => {
		await User.deleteMany({});
		const user = new User({ username: "root", password: "sekret" });
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
});

afterAll(() => {
	mongoose.connection.close();
});
