import React from 'react'
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h3>Menu </h3>
      </div>
      
      <ul className="sidebar-menu">
        {/* Section Voitures */}
        <li className="menu-section"><h4>Gestion des Voitures</h4></li>
        <li className="menu-item">
          <NavLink to="/admin/voitures/ajouter" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <i className="icon car-icon"></i>
            <span>Ajouter une voiture</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/admin/voitures" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <i className="icon list-icon"></i>
            <span>Liste des voitures</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/admin/recherches" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <i className="icon list-icon"></i>
            <span>Rechercher une voiture</span>
          </NavLink>
        </li>

        {/* Section Clients */}
        <li className="menu-section"><h4>Gestion des Clients</h4></li>
        <li className="menu-item">
          <NavLink to="/admin/clients/ajouter" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <i className="icon client-add-icon"></i>
            <span>Ajouter un client</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/admin/clients" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <i className="icon clients-icon"></i>
            <span>Liste des clients</span>
          </NavLink>
        </li>

        {/* Section Locations */}
        <li className="menu-section"><h4>Gestion des Locations</h4></li>
        <li className="menu-item">
          <NavLink to="/admin/locations/nouvelle" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <i className="icon rent-icon"></i>
            <span>Ajouter une location</span>
          </NavLink>
        </li>
        <li className="menu-item">
          <NavLink to="/admin/locations" className={({ isActive }) => isActive ? 'menu-link active' : 'menu-link'}>
            <i className="icon list-icon"></i>
            <span>Liste des locations en cours</span>
          </NavLink>
        </li> 
        
      </ul>
    </div>
  )
}

export default Sidebar