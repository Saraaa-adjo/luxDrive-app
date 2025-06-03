import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './GestionLocations.css'

const API_URL = import.meta.env.VITE_API_URL

function GestionLocations({ url = API_URL }) {
  const [locations, setLocations] = useState([])
  const [loading, setLoading] = useState(true)

 const fetchLocations = async () => {
  try {
    const res = await axios.get(`${url}/api/rentals`)
    setLocations(res.data.data || []) // Correction de la faute de frappe ici
  } catch (error) {
    console.error("Erreur:", error)
    alert("Erreur lors du chargement des locations")
  } finally {
    setLoading(false)
  }
}

 const terminerLocation = async (rentalId) => {
  if (!window.confirm("Terminer cette location ?")) return;
  
  try {
    setLoading(true);
    console.log("Tentative de terminaison pour:", rentalId);
    
    const response = await axios.put(`${url}/api/rentals/${rentalId}/terminer`);
    console.log("Réponse du serveur:", response.data);
    
    await fetchLocations();
    alert("Location terminée avec succès");
  } catch (error) {
    console.error("Détails de l'erreur front:", {
      message: error.message,
      response: error.response,
      config: error.config
    });
    
    const errorMessage = error.response?.data?.message 
      || error.response?.data?.error
      || error.message;
    
    alert(`Échec de la terminaison: ${errorMessage}`);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchLocations()
  }, [])

  return (
    <div className="liste-locations-container">
      <h2>Liste des Locations</h2>

      {loading ? (
        <p>Chargement...</p>
      ) : locations.length === 0 ? (
        <p>Aucune location trouvée.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Client</th>
              <th>Voiture</th>
              <th>Date début</th>
              <th>Date fin</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {locations.map(loc => (
              <tr key={loc.id}>
                <td>{loc.Client ? `${loc.Client.firstName} ${loc.Client.lastName}` : 'Inconnu'}</td>
                <td>{loc.Car?.brand} {loc.Car?.model}</td>
                <td>{new Date(loc.startDate).toLocaleDateString()}</td>
                <td>{new Date(loc.endDate).toLocaleDateString()}</td>
                <td>{loc.status}</td>
                <td>
                  {loc.status !== 'terminé' ? (
                    <button 
                      onClick={() => terminerLocation(loc.id)}
                      className="terminer-btn"
                    >
                      Terminer
                    </button>
                  ) : (
                    <span className="termine-badge">Terminé</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default GestionLocations