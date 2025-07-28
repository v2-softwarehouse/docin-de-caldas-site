export async function createCheckoutSession(cart, address) {
  try {
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cart, address })
    });

    const data = await response.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      throw new Error('Erro ao redirecionar para o Stripe Checkout');
    }
  } catch (error) {
    console.error('Erro ao criar sessão de checkout:', error);
    alert('Erro ao redirecionar para o pagamento.');
  }
}