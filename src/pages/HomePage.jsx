
import React, { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../services/firebase'

export default function HomePage() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const load = async () => {
      const snap = await getDocs(collection(db, 'products'))
      setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
    }
    load()
  }, [])

  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    const existing = cart.find(p => p.id === product.id)
    if (existing) {
      existing.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    alert('Produto adicionado ao carrinho!')
  }

  return (
    <div className="page">
      <h2>Produtos Artesanais</h2>
      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="product">
            <img src={p.image} alt={p.name} />
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <strong>R$ {p.price.toFixed(2)}</strong>
            <button onClick={() => addToCart(p)}>Comprar</button>
          </div>
        ))}
      </div>
    </div>
  )
}
