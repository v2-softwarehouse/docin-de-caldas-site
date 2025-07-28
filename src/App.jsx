
import React from 'react'
import './App.css'
import logo from './assets/logo-docin-de-caldas.png'

export default function App() {
  return (
    <main className="app">
      <img src={logo} alt="Logo Docin de Caldas" className="logo" />
      <h1>Docin de Caldas</h1>
      <p>Produtos artesanais da Serra da Mantiqueira</p>
    </main>
  )
}
