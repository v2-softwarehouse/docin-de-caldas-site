
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '../services/firebase'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(db, 'users', cred.user.uid), { email, admin: false })
      window.location.href = '/'
    } catch (err) {
      setError('Erro ao criar conta.')
    }
  }

  return (
    <div className="page">
      <h2>Criar Conta</h2>
      <form onSubmit={handleRegister}>
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      {error && <p className="error">{error}</p>}
    </div>
  )
}
