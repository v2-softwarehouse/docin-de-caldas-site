
import React, { useEffect, useState } from 'react'
import { collection, getDocs, addDoc, deleteDoc, doc, getDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

export default function AdminPage() {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])
  const [form, setForm] = useState({ name: '', description: '', price: '', image: '' })

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(async (u) => {
      if (u) {
        setUser(u)
        const userDoc = await getDoc(doc(db, 'users', u.uid))
        if (userDoc.exists() && userDoc.data().admin) {
          setIsAdmin(true)
          loadProducts()
          loadOrders()
        }
      }
    })
    return () => unsub()
  }, [])

  const loadProducts = async () => {
    const snap = await getDocs(collection(db, 'products'))
    setProducts(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  const loadOrders = async () => {
    const snap = await getDocs(collection(db, 'orders'))
    setOrders(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })))
  }

  const addProduct = async () => {
    if (!form.name || !form.price) return
    await addDoc(collection(db, 'products'), {
      name: form.name,
      description: form.description,
      price: parseFloat(form.price),
      image: form.image
    })
    setForm({ name: '', description: '', price: '', image: '' })
    loadProducts()
  }

  const removeProduct = async (id) => {
    await deleteDoc(doc(db, 'products', id))
    loadProducts()
  }

  if (!user) return <div className="page"><h2>Faça login</h2></div>
  if (!isAdmin) return <div className="page"><h2>Acesso restrito a administradores</h2></div>

  return (
    <div className="page">
      <h2>Painel Administrativo</h2>

      <h3>Novo Produto</h3>
      <input placeholder="Nome" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Descrição" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Preço" type="number" value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
      <input placeholder="Imagem (URL)" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
      <button onClick={addProduct}>Cadastrar</button>

      <h3>Produtos Cadastrados</h3>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            <strong>{p.name}</strong> – R$ {p.price.toFixed(2)}<br />
            <button onClick={() => removeProduct(p.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <h3>Pedidos Recebidos</h3>
      <ul>
        {orders.length === 0 ? (
          <p>Nenhum pedido até o momento.</p>
        ) : (
          orders.map(order => (
            <li key={order.id}>
              <strong>{order.email}</strong><br />
              Endereço: {order.address}<br />
              <ul>
                {order.items.map(item => (
                  <li key={item.id}>
                    {item.name} x {item.quantity} — R$ {(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              <hr />
            </li>
          ))
        )}
      </ul>
    </div>
  )
}
