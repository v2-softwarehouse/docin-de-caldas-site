const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors')({ origin: true });

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    if (req.method !== 'POST') {
      return res.status(405).send('Método não permitido');
    }

    try {
      const { cart, address } = req.body;

      if (!cart || cart.length === 0) {
        return res.status(400).send('Carrinho vazio');
      }

      const line_items = cart.map((item) => ({
        price_data: {
          currency: 'brl',
          product_data: {
            name: item.name,
            description: item.description || '',
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      }));

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items,
        success_url: 'https://docindecaldas.com.br/sucesso',
        cancel_url: 'https://docindecaldas.com.br/cancelado',
        metadata: {
          nome: address.nome,
          endereco: address.endereco,
          cidade: address.cidade,
          cep: address.cep
        }
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      console.error('Erro ao criar sessão de checkout:', error);
      res.status(500).send('Erro interno');
    }
  });
});