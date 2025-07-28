const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

admin.initializeApp();
const db = admin.firestore();

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  try {
    const { items, email, address } = req.body;

    const line_items = items.map(item => ({
      price_data: {
        currency: "brl",
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: "https://docin-de-caldas.web.app/sucesso",
      cancel_url: "https://docin-de-caldas.web.app/cancelado",
      customer_email: email,
      metadata: {
        address,
      }
    });

    // Gravação do pedido no Firestore
    await db.collection('orders').add({
      email,
      address,
      items,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Erro no checkout:", error);
    res.status(500).json({ error: "Erro ao criar sessão de pagamento" });
  }
});