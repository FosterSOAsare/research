const express = require("express");

const authRouter = require("./auth/auth.router");

const appRouter = express.Router();

appRouter.use("/auth", authRouter);

appRouter.get("/", (req, res) => {
	res.status(200).json({ success: "Server listening..." });
});

module.exports = appRouter;
