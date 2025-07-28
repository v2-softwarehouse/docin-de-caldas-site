const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
admin.initializeApp();

exports.createCheckoutSession = functions.https.onCall(async (data, context) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: data.items,
    mode: 'payment',
    success_url: data.success_url,
    cancel_url: data.cancel_url
  });
  return { id: session.id };
});