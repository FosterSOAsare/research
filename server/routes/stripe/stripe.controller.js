require("dotenv").config();

const asyncHandler = require("express-async-handler");
const stripe = require("stripe")(process.env.stripe_key);
// const User = require("../../schemas/User.schema");
let customerId = "cus_PiDlFVOn0D5c7Y";

let prices = [process.env.PREMIUM, process.env.PRO];

const extractSubscription = asyncHandler(async (customerId) => {
	// / Retrieve customer using  id
	const subscriptions = await stripe.subscriptions.list({
		customer: customerId,
	});

	if (subscriptions?.data?.length > 0) {
		// Retrieve subscription
		const subscription = await stripe.subscriptions.retrieve(subscriptions?.data?.[0]?.id);
		console.log("sub", subscription);
		let { plan, status } = subscription;
		if (status === "active") {
			plan = prices.findIndex((price) => price == plan.id);
			return plan !== -1 ? (plan == 0 ? "premium" : plan === 1 ? "pro" : "free") : "free";
		} else {
			user.plan = "free";
		}
	} else {
		return "free";
	}
});

// This is just for getting a customer,
const getCustomerDetails = asyncHandler(async (req, res) => {
	const plan = await extractSubscription(customerId);

	res.status(200).json({ plan, customerId });
});

// Create customer on registration
const createCustomer = asyncHandler(async () => {
	const customer = await stripe.customers.create({
		email: "asarefoster@gmail.com",
	});

	console.log(customer);
});

const getSubscriptions = asyncHandler(async (req, res) => {
	res.status(200).json(prices);
});
const createSubscriptionCheckoutSession = asyncHandler(async (req, res) => {
	const { priceId } = req.query;
	if (!priceId) {
		return res.status(400).json({ error: "Please provide a priceId" });
	}

	// Retrieve customer id
	const plan = await extractSubscription(customerId);

	if (plan === "free") {
		// Create a session checkout
		const session = await stripe.checkout.sessions.create({
			mode: "subscription",
			payment_method_types: ["card"],
			line_items: [
				{
					price: priceId,
					quantity: 1,
				},
			],
			success_url: `${process.env.CLIENT_URL}/stripe/success?type=recur&session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/stripe/error`,
			customer: customerId,
		});
		res.status(200).json({ url: session?.url });
	} else {
		// Create a biiling
		const billingPortalSession = await stripe.billingPortal.sessions.create({
			customer: customerId,
			return_url: `${process.env.CLIENT_URL}/stripe`,
		});
		res.status(200).json({ url: billingPortalSession?.url });
	}
});

const validateSubscriptionSession = asyncHandler(async (req, res) => {
	// try {
	// 	const user = await User.findOne({ _id: req.session.user._id });
	// 	if (!user?.subscription?.sessionId) {
	// 		res.status(403);
	// 		throw new Error("User not authorized to perform this action");
	// 	}
	// 	// Validate session
	// 	const session = await stripe.checkout.sessions.retrieve(user?.subscription?.sessionId);
	// 	if (session.payment_status === "paid") {
	// 		// Update subscription
	// 		// Get subscription'
	// 		const subscription = await stripe.subscriptions.retrieve(session.subscription);
	// 		let { customer, status, plan } = subscription;
	// 		if (status === "active") {
	// 			// Update user's subscription
	// 			plan = prices.findIndex((price) => price == plan.id);
	// 			let subscriptionType = plan >= 0 ? (plan == 1 ? "premium" : plan === 2 ? "premiumPlus" : "free") : "free";
	// 			await User.updateOne({ _id: req.session.user._id }, { $set: { subscription: { customer, subscriptionId: session.subscription } } });
	// 			// Return new subscription
	// 			return res.status(200).json({ success: true, subscriptionType });
	// 		}
	// 		res.status(400);
	// 		throw new Error("There was an error since payment was cancelled");
	// 	} else {
	// 		res.status(400);
	// 		throw new Error("There was an error since payment was cancelled");
	// 	}
	// } catch (error) {
	// 	console.log(error);
	// 	res.status(400).json({ error: error.message });
	// }
});

const generateCheckoutSession = asyncHandler(async (req, res) => {
	const { amount } = req.query;

	const session = await stripe.checkout.sessions.create({
		payment_method_types: ["card"],
		line_items: [
			{
				price_data: {
					currency: "usd",
					product_data: {
						name: "Test Product Name",
						description: "Creating some data",
					},
					unit_amount: 100 * +amount, // Amount in cents
				},
				quantity: 1,
			},
		],
		mode: "payment",
		// {CHECKOUT_SESSION_ID} is a template for getting the session_id
		success_url: `${process.env.CLIENT_URL}/stripe/success?type=once&session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${process.env.CLIENT_URL}/stripe/error`,
	});

	// Store session.id so that it can be retrieved later for verification

	res.json({ url: session.url });
});

const validateCheckoutSession = asyncHandler(async (req, res) => {
	// retrieve the session.id
	const { sessionId } = req.query;
	const session = await stripe.checkout.sessions.retrieve(sessionId);

	if (session.payment_status === "paid") {
		// Update as needed
	} else {
		res.status(400).json({ error: "The session was not completed since user didn't make payment" });
	}
	res.status(200).json({ message: "Validation was successful" });
});

module.exports = {
	getSubscriptions,
	validateSubscriptionSession,
	createSubscriptionCheckoutSession,
	generateCheckoutSession,
	validateCheckoutSession,
	getCustomerDetails,
};
