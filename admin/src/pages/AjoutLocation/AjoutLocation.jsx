import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AjoutLocation.css";
import { pricingStrategies } from "../../Pattern/pricingStrategies";

const API_URL = import.meta.env.VITE_API_URL

function AjoutLocation({ url= API_URL }) {
  const [clients, setClients] = useState([]);
  const [voitures, setVoitures] = useState([]);
  const [location, setLocation] = useState({
    carId: "",
    clientId: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientsRes, voituresRes] = await Promise.all([
          axios.get(`${url}/api/clients`),
          axios.get(`${url}/api/cars/available`), // Notez le changement d'URL ici
        ]);

        // Debug: Afficher les réponses
        console.log("Clients:", clientsRes.data);
        console.log("Voitures:", voituresRes.data);

        // Modification ici pour accéder aux bonnes propriétés
        setClients(clientsRes.data.data || clientsRes.data || []);
        setVoitures(voituresRes.data.data || voituresRes.data || []);
      } catch (error) {
        console.error("Erreur détaillée:", {
          message: error.message,
          response: error.response,
          stack: error.stack,
        });
      }
    };
    fetchData();
  }, [url]); // Ajout de la dépendance url

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${url}/api/rentals`, location);
      alert("Location créée avec succès!");
      setLocation({
        carId: "",
        clientId: "",
        startDate: "",
        endDate: "",
      });
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la création de la location");
    }
  };

  //pricing strategy
  const [strategyType, setStrategyType] = useState("standard"); // Par défaut, on utilise la stratégie standard
  const calculateTotal = () => {
    const start = new Date(location.startDate);
    const end = new Date(location.endDate);
    const days = (end - start) / (1000 * 60 * 60 * 24) + 1;
    return pricingStrategies[strategyType](selectedCar.dailyPrice, days);
  };

  return (
    <div className="ajout-location">
      <h2>Créer une Nouvelle Location</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <select
            name="clientId"
            value={location.clientId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un client</option>
            {clients.map((client) => (
              <option key={client.id} value={client.id}>
                {client.firstName} {client.lastName}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <select
            name="carId"
            value={location.carId}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une voiture</option>
            {voitures.map((voiture) => (
              <option key={voiture.id} value={voiture.id}>
                {voiture.brand} {voiture.model} - {voiture.dailyPrice}FCFA/jour
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <input
              type="date"
              name="startDate"
              value={location.startDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="date"
              name="endDate"
              value={location.endDate}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <button type="submit">Créer une location</button>
      </form>
    </div>
  );
}

export default AjoutLocation;
