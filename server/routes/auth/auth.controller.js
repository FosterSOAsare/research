const asyncHandler = require("express-async-handler");

const controllerAuthThirdParty = asyncHandler(async (req, res) => {
	if (!req.isAuthenticated()) {
		res.status(401).json({ success: false, message: "Authentication failed" });
		return;
	}

	let { id, provider, email, image, name } = req.user;

	req.session.user = { id, provider, email, image, name };
	res.redirect(`${process.env.CLIENT_URL}/verify-auth`);
});

const verifyAuth = asyncHandler(async (req, res) => {
	res.status(200).json(req.session.user);
});

module.exports = {
	controllerAuthThirdParty,
	verifyAuth,
};
