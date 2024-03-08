require("dotenv").config();
const passportInstance = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const GitHubStrategy = require("passport-github").Strategy;

const GOOGLE_AUTH_OPTIONS = {
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: `${process.env.CLIENT_URL}/api/auth/google/callback`,
};

const TWITTER_AUTH_OPTIONS = {
	consumerKey: process.env.TWITTER_CLIENT_ID,
	consumerSecret: process.env.TWITTER_CLIENT_SECRET,
	callbackURL: `${process.env.CLIENT_URL}/api/auth/twitter/callback`,
};

const GITHUB_AUTH_OPTIONS = {
	clientID: process.env.GITHUB_CLIENT_ID,
	clientSecret: process.env.GITHUB_CLIENT_SECRET,
	callbackURL: `${process.env.CLIENT_URL}/api/auth/github/callback`,
};

// Define your Passport.js authentication strategies
// GMAIL authentication strategies
passportInstance.use(
	new GoogleStrategy(GOOGLE_AUTH_OPTIONS, async (accessToken, refreshToken, profile, done) => {
		console.log(profile);
		let data = {
			id: profile?.id,
			email: profile?._json?.email || "",
			image: profile?._json?.picture || "",
			provider: "google",
			name: `${profile?.name?.familyName} ${profile?.name?.givenName}`,
		};

		done(null, data);
	})
);
// GITHUB authentication strategies
passportInstance.use(
	new GitHubStrategy(GITHUB_AUTH_OPTIONS, async (accessToken, refreshToken, profile, done) => {
		const names = profile?.name?.split(" ");
		let data = {
			id: profile?.id,
			displayName: profile?.displayName,
			email: profile?._json?.email,
			image: profile?._json?.avatar_url,
			provider: "github",
			name: profile?._json?.name,
		};

		done(null, data);
	})
);
// TWITTER authentication strategies
passportInstance.use(
	new TwitterStrategy(TWITTER_AUTH_OPTIONS, (token, tokenSecret, profile, done) => {
		// Handle user authentication and retrieval of user profile
		// Call done() with the user object or an error
		let data = {
			id: profile?.id,
			displayName: profile?.displayName,
			email: profile?._json?.email,
			image: profile?._json?.profile_image_url_https,
			provider: "twitter",
			name: profile?._json?.name,
		};
		done(null, data);
	})
);

passportInstance.serializeUser(function (user, done) {
	done(null, user);
});

passportInstance.deserializeUser(function (user, done) {
	done(null, user);
});
module.exports = passportInstance;
