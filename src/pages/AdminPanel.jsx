import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/orders';

export default function AdminPanel() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders().then(setOrders);
  }, []);

  return (
    <main>
      <h2>Painel Administrativo</h2>
      <table>
        <thead>
          <tr>
            <th>Cliente</th>
            <th>Total</th>
            <th>Endereço</th>
            <th>Produtos</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.address?.name}</td>
              <td>R$ {order.amount / 100}</td>
              <td>{order.address?.street}</td>
              <td>
                <ul>
                  {order.cart?.map((item, i) => (
                    <li key={i}>{item.name} (x{item.quantity})</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}