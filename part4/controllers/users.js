const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

// GET requests

usersRouter.get("/", async (request, response, next) => {
	try {
		const users = await User.find({});
		response.json(users.map(user => user.toJSON()));
	} catch (error) {
		next(error);
	}
});

// POST requests

usersRouter.post("/", async (request, response, next) => {
	try {
		const body = request.body;

		const saltRounds = 10;
		const passwordHash = await bcrypt.hashSync(body.password, saltRounds);

		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash
		});

		const savedUser = await user.save();

		response.json(savedUser);
	} catch (exception) {
		next(exception);
	}
});

module.exports = usersRouter;
