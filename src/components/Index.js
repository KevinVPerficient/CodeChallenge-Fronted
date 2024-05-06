import React from 'react'
import '../App.css';
import Navbar from './Navbar';

export const Index = () => {
  return (
    <div className="App">
      <Navbar/>
      <header className="App-header">
        <h1>Bienvenido al sistema de administración de clientes</h1>
        <p>Por favor seleccione la entidad a administrar</p>
      </header>
    </div>
  )
}

export default Index;