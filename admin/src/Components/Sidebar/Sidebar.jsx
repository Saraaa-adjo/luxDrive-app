import React from 'react'
import './Sidebar.css'
import { NavLink } from 'react-router-dom'

function Sidebar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink 
            to="/ajout" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Ajouter un plat
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/liste" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Liste des plats
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/commandes" 
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            Commandes
          </NavLink>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
