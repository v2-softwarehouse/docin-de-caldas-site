import React, { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import '../style.css';

const firebaseConfig = {
  apiKey: "AIzaSyAcLPV3-W2YOorc_JT4AUwHtRRYzA8F0dU",
  authDomain: "docin-de-caldas.firebaseapp.com",
  databaseURL: "https://docin-de-caldas-default-rtdb.firebaseio.com",
  projectId: "docin-de-caldas",
  storageBucket: "docin-de-caldas.firebasestorage.app",
  messagingSenderId: "658690196453",
  appId: "1:658690196453:web:657a592e147ef06318650c",
  measurementId: "G-NFDL9MPF2Y"
};

const app = initializeApp(firebaseConfig);

import { useCart } from '../context/CartContext';

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const db = getDatabase(app);
    const productsRef = ref(db, 'products');
    onValue(productsRef, (snapshot) => {
      const data = snapshot.val();
      const loaded = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setProducts(loaded);
    });
  }, []);

  return (
    <main>
      <h1>Catálogo de Produtos</h1>
      <div className="catalog">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <img src={product.image || 'https://via.placeholder.com/200'} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>R$ {Number(product.price).toFixed(2)}</strong></p>
            <p>Estoque: {product.stock}</p>
          </div>
        ))}
      </div>
    </main>
  );
}