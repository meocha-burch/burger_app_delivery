// Backend route to create payment intent
app.post("/api/checkout/create-payment-intent", async (req, res) => {
  try {
    const { paymentMethodId, amount } = req.body;

    if (!paymentMethodId || !amount) {
      return res.status(400).send({ error: "Missing paymentMethodId or amount." });
    }

    // Create a PaymentIntent with the amount and currency (USD)
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount should be in cents (e.g., 1000 for $10)
      currency: "usd", // Change this if you want to support different currencies
      payment_method: paymentMethodId,
      confirmation_method: "manual", // Leave as "manual" to handle confirmation on frontend
      confirm: true, // Immediately confirm the payment
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    // Return a more specific error message to the frontend
    res.status(500).send({ error: error.message });
  }
});
