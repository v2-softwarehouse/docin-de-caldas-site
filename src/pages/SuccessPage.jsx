
import React, { useEffect } from 'react'

export default function SuccessPage() {
  useEffect(() => {
    localStorage.removeItem('cart')
  }, [])

  return (
    <div className="page">
      <h2>Compra realizada com sucesso! 🎉</h2>
      <p>Obrigado por comprar com a Docin de Caldas.</p>
    </div>
  )
}
