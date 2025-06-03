import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './ListeClients.css'

function ListeClients({ url }) {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchClients = async () => {
    try {
      const res = await axios.get(`${url}/api/clients`)
      setClients(res.data.data)
    } catch (error) {
      console.error("Erreur:", error)
    } finally {
      setLoading(false)
    }
  }

  const supprimerClient = async (id) => {
    if (window.confirm("Supprimer définitivement ce client ?")) {
      try {
        await axios.delete(`${url}/api/clients/${id}`)
        fetchClients()
      } catch (error) {
        console.error("Erreur:", error)
      }
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  return (
    <div className="clients-container">
      <div className="clients-header">
        <h2>Liste des Clients</h2>
        <div className="total-clients">{clients.length} clients enregistrés</div>
      </div>
      
      {loading ? (
        <div className="loading-spinner"></div>
      ) : (
        <div className="clients-table-container">
          <table className="clients-table">
            <thead>
              <tr>
                <th style={{ width: '25%' }}>Nom Complet</th>
                <th style={{ width: '35%' }}>Email</th>
                <th style={{ width: '20%' }}>Téléphone</th>
                <th style={{ width: '20%' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map(client => (
                <tr key={client.id}>
                  <td>
                    <div className="client-name">
                      <span className="last-name">{client.lastName}</span>
                      <span className="first-name">{client.firstName}</span>
                    </div>
                  </td>
                  <td className="email-cell">{client.email}</td>
                  <td>{client.phone || '-'}</td>
                  <td>
                    <div className="actions-container">
                      <button 
                        onClick={() => supprimerClient(client.id)}
                        className="delete-btn"
                      >
                        Supprimer
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {/* Message quand aucun client */}
          {clients.length === 0 && !loading && (
            <div className="no-clients">Aucun client trouvé</div>
          )}
        </div>
      )}
    </div>
  )
}
export default ListeClients