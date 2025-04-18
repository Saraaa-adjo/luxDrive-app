import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'

function Navbar({isAdmin = true}) {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={assets.logo} alt="Logo" className="logo" />
        <h1 className="app-title">
          {isAdmin ? ' Location de Voitures' : 'Louez votre voiture'}
        </h1>
      </div>
      
        <input 
          type="search" 
          placeholder="Rechercher un client, une voiture..." 
          className="search-bar"
        />
    </nav>
  )
}

export default Navbar