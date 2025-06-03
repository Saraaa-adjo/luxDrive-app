import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ListeVoitures.css'

const API_URL = import.meta.env.VITE_API_URL


function ListeVoitures({ url = API_URL }) {
  const [voitures, setVoitures] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchVoitures = async () => {
    try {
      const res = await axios.get(`${url}/api/cars/list`)
      setVoitures(res.data.data || [])
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const supprimerVoiture = async (id) => {
    if (window.confirm("Supprimer cette voiture ?")) {
      try {
        await axios.delete(`${url}/api/cars/${id}`)
        fetchVoitures()
      } catch (error) {
        console.error("Erreur:", error)
      }
    }
  }

  const toggleDisponibilite = async (id, isAvailable) => {
    try {
      await axios.put(`${url}/api/cars/${id}/disponibilite`, {
        isAvailable: !isAvailable
      })
      fetchVoitures()
    } catch (error) {
      console.error("Erreur:", error)
    }
  }

  useEffect(() => {
    fetchVoitures()
  }, [])

  return (
    <div className="liste-voitures-container">
      <h2>Liste des Voitures</h2>
      
      {loading ? (
        <div className="loading-spinner"></div>
      ) : voitures.length === 0 ? (
        <p className="no-cars">Aucune voiture disponible</p>
      ) : (
        <div className="voitures-grid">
          {voitures.map(voiture => (
            <div key={voiture.id} className="voiture-card">
                <div className="voiture-image-container">
                {voiture.image ? (
                    <img 
                    src={`${url}/images/${voiture.image}`}
                    alt={`${voiture.brand} ${voiture.model}`}
                    className="voiture-image"
                    onError={(e) => {
                        e.target.src = '/placeholder-car.png'
                        e.target.onerror = null
                    }}
                    />
                ) : (
                    <div className="no-image-placeholder">
                    <span>Pas d'image</span>
                    </div>
                )}
                <span className={`disponibilite-badge ${voiture.isAvailable ? 'disponible' : 'indisponible'}`}>
                    {voiture.isAvailable ? 'Disponible' : 'Indisponible'}
                </span>
                </div>
              
              <div className="voiture-info">
                <h3>{voiture.brand} {voiture.model}</h3>
                <p className="voiture-description">{voiture.description}</p>
                
                <div className="voiture-details">
                  <div className="detail-item">
                    <span className="detail-label">Prix/jour:</span>
                    <span className="detail-value">{voiture.dailyPrice} FCFA</span>
                  </div>
                </div>
                
                <div className="voiture-actions">
                  <button 
                    onClick={() => toggleDisponibilite(voiture.id, voiture.isAvailable)}
                    className={`action-btn ${voiture.isAvailable ? 'make-indispo' : 'make-dispo'}`}
                  >
                    {voiture.isAvailable ? 'Rendre Indisponible' : 'Rendre Disponible'}
                  </button>
                  <button 
                    onClick={() => supprimerVoiture(voiture.id)}
                    className="action-btn delete-btn"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ListeVoitures