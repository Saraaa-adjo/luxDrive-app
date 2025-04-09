import React, { useState, useEffect } from 'react';
import "./Liste.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Liste({ url }) {
  const [foods, setFoods] = useState([]);

  useEffect(() => {
    fetchFoods();
  }, []); 

  const fetchFoods = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoods(response.data.data);
    } catch (error) {
      toast.error("Erreur lors du chargement des plats");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce plat ?")) {
      try {
        await axios.delete(`${url}/api/food/remove`, { data: { id } });
        toast.success("Plat supprimé avec succès");
        fetchFoods(); // Recharger la liste après suppression
      } catch (error) {
        toast.error("Erreur lors de la suppression");
      }
    }
  };

  const startEdit = (item) => {
    // À implémenter plus tard : logique de modification
    toast.info("Fonction de modification en cours de développement");
  };

  return (
    <div className="liste-container">
      <h2>Liste des Plats</h2>

      <div className="table-responsive">
        <table className="styled-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Nom</th>
              <th>Description</th>
              <th>Prix (FCFA)</th>
              <th>Restaurant</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="food-image"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.price} FCFA</td>
                <td>{item.restaurant}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => startEdit(item)}
                  >
                    Modifier
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Liste;
