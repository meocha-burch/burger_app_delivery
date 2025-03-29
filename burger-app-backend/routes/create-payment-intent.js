// Backend route to create payment intent
app.post("/api/checkout/create-payment-intent", async (req, res) => {
  try {
    const { paymentMethodId, amount } = req.body;

    // Create a PaymentIntent with the amount and currency (USD)
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method: paymentMethodId,
      confirmation_method: "manual",
      confirm: true,
    });

    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    res.status(500).send({ error: error.message });
  }
});
