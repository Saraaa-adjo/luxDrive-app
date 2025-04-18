import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RechercheVoitures.css';
import { assets } from '../../assets/assets';

function RechercheVoitures({ url }) {
  const [cars, setCars] = useState([]);
  const [searchParams, setSearchParams] = useState({
    startDate: '',
    endDate: '',
    brand: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/cars/available`, {
        params: searchParams
      });
      setCars(response.data.data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="recherche-container">
      <h2>Rechercher une voiture disponible</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="form-group">
          <label>Date de début</label>
          <input
            type="date"
            name="startDate"
            value={searchParams.startDate}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Date de fin</label>
          <input
            type="date"
            name="endDate"
            value={searchParams.endDate}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Marque (optionnel)</label>
          <input
            type="text"
            name="brand"
            value={searchParams.brand}
            onChange={handleInputChange}
            placeholder="Toutes marques"
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Recherche en cours...' : 'Rechercher'}
        </button>
      </form>

      {cars.length > 0 && (
        <div className="results-container">
          <h3>Résultats ({cars.length})</h3>
          <div className="cars-grid">
            {cars.map(car => (
              <div key={car.id} className="car-card">
                <img src={`${url}/images/${car.image}`} alt={car.model} />
                <div className="car-info">
                  <h4>{car.brand} {car.model}</h4>
                  <p>{car.description}</p>
                  <div className="car-price">
                    {car.dailyPrice} €/jour
                  </div>
                  <button className="book-button">
                    Réserver maintenant
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RechercheVoitures;