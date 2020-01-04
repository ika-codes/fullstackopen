const bcrypt = require("bcryptjs");
const usersRouter = require("express").Router();
const User = require("../models/user");

// GET requests

usersRouter.get("/", async (request, response, next) => {
	try {
		const users = await User.find({}).populate("blogs", {
			title: 1,
			url: 1,
			author: 1
		});
		response.json(users.map(user => user.toJSON()));
	} catch (error) {
		next(error);
	}
});

// POST requests

usersRouter.post("/", async (request, response, next) => {
	try {
		const body = request.body;

		if (body.password && body.password.length > 2) {
			const saltRounds = 10;
			const passwordHash = await bcrypt.hashSync(
				body.password,
				saltRounds
			);

			const user = new User({
				username: body.username,
				name: body.name,
				passwordHash
			});

			const savedUser = await user.save();

			response.json(savedUser);
		} else {
			return response
				.status(400)
				.send({ error: "Password not entered or too short." });
		}
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
	}

	next(error);
};

usersRouter.use(errorHandler);

module.exports = usersRouter;
