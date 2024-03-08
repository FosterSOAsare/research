const express = require("express");
const passportInstance = require("../../libs/passport");
const { controllerAuthThirdParty, verifyAuth } = require("./auth.controller");
const user = require("../../middlewares/user.middleware");

const authRouter = express.Router();

authRouter.get("/google", passportInstance.authenticate("google", { scope: ["email", "profile"] }));
authRouter.get("/google/callback", passportInstance.authenticate("google"), controllerAuthThirdParty);

authRouter.get("/verify", user, verifyAuth);

authRouter.get("/twitter", passportInstance.authenticate("twitter"));
authRouter.get("/twitter/callback", passportInstance.authenticate("twitter"), controllerAuthThirdParty);

authRouter.get("/linkedin", passportInstance.authenticate("linkedin"));
authRouter.get("/linkedin/callback", passportInstance.authenticate("linkedin"), controllerAuthThirdParty);

authRouter.get("/github", passportInstance.authenticate("github"));
authRouter.get("/github/callback", passportInstance.authenticate("github"), controllerAuthThirdParty);

module.exports = authRouter;
