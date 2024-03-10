const express = require("express");

const authRouter = require("./auth/auth.router");
const subscriptionsRouter = require("./stripe/stripe.router");

const appRouter = express.Router();

appRouter.use("/auth", authRouter);
appRouter.use("/stripe", subscriptionsRouter);

appRouter.get("/", (req, res) => {
	res.status(200).json({ success: "Server listening..." });
});

module.exports = appRouter;
