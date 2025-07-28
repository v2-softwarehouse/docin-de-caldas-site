import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { createCheckoutSession } from '../services/stripe';

export default function Checkout() {
  const { cart } = useCart();
  const [address, setAddress] = useState({
    nome: '',
    endereco: '',
    cidade: '',
    cep: ''
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!address.nome || !address.endereco || !address.cidade || !address.cep) {
      alert('Preencha todos os campos de endereço.');
      return;
    }
    createCheckoutSession(cart, address);
  };

  return (
    <main>
      <h1>Finalizar Compra</h1>
      {cart.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
            <input name="nome" placeholder="Nome completo" value={address.nome} onChange={handleChange} required />
            <input name="endereco" placeholder="Endereço" value={address.endereco} onChange={handleChange} required />
            <input name="cidade" placeholder="Cidade" value={address.cidade} onChange={handleChange} required />
            <input name="cep" placeholder="CEP" value={address.cep} onChange={handleChange} required />
          </form>
          <h3>Subtotal: R$ {subtotal.toFixed(2)}</h3>
          <button style={{ marginTop: '1rem' }} onClick={handlePayment}>Pagar com Stripe</button>
        </>
      )}
    </main>
  );
}