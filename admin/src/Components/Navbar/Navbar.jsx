import React from 'react'
import './Navbar.css'
import {assets} from '../../assets/assets'


function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={assets.logo} alt="Logo" className="logo" />
        <h2 className="app-title">Partie Administrateur pour les Restaurants</h2>
      </div>
      <div className="navbar-right">
        <img src={assets.profile_image} alt="Admin" className="admin-icon" />
      </div>
    </nav>
  )
}

export default Navbar

