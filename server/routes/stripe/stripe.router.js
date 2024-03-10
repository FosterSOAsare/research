require("dotenv").config();
const express = require("express");

const user = require("../../middlewares/user.middleware");

const { createSubscriptionCheckoutSession, validateSubscriptionSession, getSubscriptions, generateCheckoutSession, validateCheckoutSession, getCustomerDetails } = require("./stripe.controller");

const subscriptionsRouter = express.Router();

subscriptionsRouter.get("/", getSubscriptions);
subscriptionsRouter.get("/customer-details", getCustomerDetails);
subscriptionsRouter.get("/create-subscription-session", createSubscriptionCheckoutSession);
subscriptionsRouter.get("/handle-success", validateSubscriptionSession);
subscriptionsRouter.get("/create-checkout-session", generateCheckoutSession);
subscriptionsRouter.get("/validate-checkout-session", validateCheckoutSession);

module.exports = subscriptionsRouter;
