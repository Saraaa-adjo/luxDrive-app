import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GestionLocations.css';

function GestionLocations({ url }) {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocations = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${url}/api/rentals`);
      
      if (res.data?.success) {
        setLocations(res.data.data);
      } else {
        throw new Error(res.data?.message || 'Données non reçues');
      }
    } catch (error) {
      console.error("Erreur:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  const handleReturn = async (id, isEarly) => {
    try {
      if (isEarly) {
        const newDate = prompt('Nouvelle date de retour (YYYY-MM-DD):');
        if (!newDate) return;
        
        await axios.put(`${url}/api/rentals/${id}/retour`, { 
          actualEndDate: newDate 
        });
      } else {
        await axios.put(`${url}/api/rentals/${id}/retour`);
      }
      fetchLocations();
    } catch (error) {
      alert(error.response?.data?.message || 'Erreur lors de la mise à jour');
    }
  };

  useEffect(() => { fetchLocations(); }, [url]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString('fr-FR', options);
  };

  const formatPriceFCFA = (price) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'decimal',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price || 0) + ' FCFA';
  };


  if (loading) return <div className="loading-spinner">Chargement...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="locations-container">
      <h2>Gestion des Locations</h2>
      
      <table className="locations-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Téléphone</th>
            <th>Voiture</th>
            <th>Dates</th>
            <th>Durée (jours)</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.length > 0 ? (
            locations.map(location => (
              <tr key={location.id}>
                <td>
                  <div className="client-info">
                    <div className="client-name">
                      {location.Client?.firstName} {location.Client?.lastName}
                    </div>
                    <div className="client-email">
                      {location.Client?.email}
                    </div>
                  </div>
                </td>
                <td>{location.Client?.phone}</td>
                <td>
                  {location.Car ? (
                    <div className="car-info">
                      <div className="car-brand-model">
                        {location.Car.brand} {location.Car.model}
                      </div>
                      <div className="car-price">
                      </div>
                    </div>
                  ) : 'N/A'}
                </td>
                <td>
                  {formatDate(location.startDate)} - {formatDate(location.endDate)}
                  {location.actualEndDate && (
                    <div className="actual-return">
                      (Retour: {formatDate(location.actualEndDate)})
                    </div>
                  )}
                </td>
                <td>{location.days}</td>
                <td>{formatPriceFCFA(location.finalPrice)}</td>
                <td>
                  <span className={`status-badge ${location.status}`}>
                    {location.status === 'active' ? 'En cours' : 'Terminée'}
                  </span>
                </td>
                <td className="actions">
                  {location.status === 'active' && (
                    <button 
                      onClick={() => handleReturn(location.id, true)}
                      className="btn early-return"
                    >
                      Retour anticipé
                    </button>
                  )}
                  <button
                    onClick={() => handleReturn(location.id, false)}
                    className={`btn ${location.status === 'active' ? 'complete-return' : 'archive'}`}
                  >
                    {location.status === 'active' ? 'Terminer' : 'Archiver'}
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="no-data">Aucune location trouvée</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default GestionLocations;