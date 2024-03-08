const asyncHandler = require("express-async-handler");

const user = asyncHandler(async (req, res, next) => {
	if (!req?.session?.user) {
		res.status(401);
		throw new Error("User not authorized");
	}
	next();
});

module.exports = user;
