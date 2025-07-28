import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/orders';
import { getAuth } from 'firebase/auth';

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const user = getAuth().currentUser;

  useEffect(() => {
    fetchOrders().then(all => {
      const filtered = all.filter(order => order.user === user?.uid);
      setOrders(filtered);
    });
  }, [user]);

  return (
    <main>
      <h2>Histórico de Pedidos</h2>
      {orders.length === 0 ? (
        <p>Você ainda não fez pedidos.</p>
      ) : (
        <ul>
          {orders.map(order => (
            <li key={order.id}>
              <strong>Total:</strong> R$ {order.amount / 100}<br />
              <strong>Data:</strong> {new Date(order.timestamp).toLocaleDateString()}<br />
              <strong>Endereço:</strong> {order.address?.street}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}