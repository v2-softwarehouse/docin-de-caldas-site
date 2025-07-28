
import React, { useEffect, useState } from 'react'

export default function CartPage() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || []
    setCart(items)
    setTotal(items.reduce((sum, item) => sum + item.price * item.quantity, 0))
  }, [])

  const updateQty = (id, delta) => {
    const updated = cart.map(p =>
      p.id === id ? { ...p, quantity: Math.max(1, p.quantity + delta) } : p
    )
    localStorage.setItem('cart', JSON.stringify(updated))
    setCart(updated)
    setTotal(updated.reduce((sum, item) => sum + item.price * item.quantity, 0))
  }

  const removeItem = (id) => {
    const updated = cart.filter(p => p.id !== id)
    localStorage.setItem('cart', JSON.stringify(updated))
    setCart(updated)
    setTotal(updated.reduce((sum, item) => sum + item.price * item.quantity, 0))
  }

  const checkout = () => {
    window.location.href = '/checkout'
  }

  if (cart.length === 0) {
    return <div className="page"><h2>Seu carrinho está vazio.</h2></div>
  }

  return (
    <div className="page">
      <h2>Seu Carrinho</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>R$ {item.price.toFixed(2)} x {item.quantity}</p>
            <button onClick={() => updateQty(item.id, -1)}>-</button>
            <button onClick={() => updateQty(item.id, 1)}>+</button>
            <button onClick={() => removeItem(item.id)}>Remover</button>
          </li>
        ))}
      </ul>
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={checkout}>Finalizar Compra</button>
    </div>
  )
}
