// controllers/paymentController.js

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const createPaymentIntent = async (req, res) => {
  const { amount } = req.body; // Ensure amount is in the smallest currency unit (e.g., cents for USD)
  
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,  // Convert dollars to cents
      currency: 'usd',  // Change currency as needed
    });

    res.send({
      clientSecret: paymentIntent.client_secret, // Send clientSecret back to frontend
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  createPaymentIntent,
};
