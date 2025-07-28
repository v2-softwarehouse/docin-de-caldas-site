
import React, { useEffect, useState } from 'react'
import { auth } from '../services/firebase'

export default function CheckoutPage() {
  const [cart, setCart] = useState([])
  const [total, setTotal] = useState(0)
  const [address, setAddress] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('cart')) || []
    setCart(items)
    setTotal(items.reduce((sum, item) => sum + item.price * item.quantity, 0))
  }, [])

  const handleCheckout = async () => {
    if (!auth.currentUser) {
      alert("Você precisa estar logado.")
      return
    }
    if (!address) {
      setError("Digite um endereço de entrega.")
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/createCheckoutSession', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          address,
          email: auth.currentUser.email
        })
      })
      const data = await res.json()
      window.location.href = data.url
    } catch (err) {
      setError('Erro ao iniciar checkout')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page">
      <h2>Checkout</h2>
      <textarea
        rows="4"
        placeholder="Endereço de entrega"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <h3>Total: R$ {total.toFixed(2)}</h3>
      <button onClick={handleCheckout} disabled={loading}>
        {loading ? 'Processando...' : 'Finalizar Compra'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
