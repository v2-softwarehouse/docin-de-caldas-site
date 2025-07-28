
import React, { useEffect, useState } from 'react'
import { auth } from '../services/firebase'

export default function ProfilePage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(setUser)
    return () => unsub()
  }, [])

  if (!user) {
    return <div className="page"><h2>Você precisa estar logado</h2></div>
  }

  return (
    <div className="page">
      <h2>Olá, {user.email}</h2>
      <p>Aqui você verá o histórico de pedidos e poderá atualizar sua conta em breve.</p>
    </div>
  )
}
