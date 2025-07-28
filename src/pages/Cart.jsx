import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useCart();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <main>
      <h1>Seu Carrinho</h1>
      {cart.length === 0 ? (
        <p>O carrinho está vazio.</p>
      ) : (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} style={{ marginBottom: '1rem', borderBottom: '1px solid #ccc', paddingBottom: '1rem' }}>
                <h2>{item.name}</h2>
                <p>Quantidade: {item.quantity}</p>
                <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
                <p>Total: R$ {(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
          <h3>Subtotal: R$ {subtotal.toFixed(2)}</h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button onClick={clearCart}>Esvaziar Carrinho</button>
            <Link to="/checkout">
              <button>Ir para o Checkout</button>
            </Link>
          </div>
        </>
      )}
    </main>
  );
}