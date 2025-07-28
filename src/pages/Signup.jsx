import React, { useState } from 'react';
import { register } from '../services/auth';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(email, password);
      navigate('/');
    } catch (error) {
      alert('Erro no cadastro: ' + error.message);
    }
  };

  return (
    <main>
      <h2>Cadastro</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required />
        <button type="submit">Cadastrar</button>
      </form>
      <p>Já tem conta? <a href="/login">Entrar</a></p>
    </main>
  );
}