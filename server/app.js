const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");

const appRouter = require("./routes");
const errors = require("./middlewares/error.middleware");

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: "*",
	})
);
app.use(morgan("combined"));

let initialObj = {
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
};
app.use(session(initialObj));

app.use(helmet());

app.use("/api", appRouter);

app.use(errors);

module.exports = app;
