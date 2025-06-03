import React, { useState } from 'react';
import './AjoutVehicule.css';
import { assets } from '../../assets/assets';
import axios from "axios";
import { createCar } from '../../Pattern/carFactory';

const API_URL = import.meta.env.VITE_API_URL

function AjoutVehicule({url = API_URL}) {
  const [preview, setPreview] = useState(assets.upload_area);
  const [image, setImage] = useState(null);
  const [vehicleType, setVehicleType] = useState('standard');
  const [data, setData] = useState({
    model: '',
    brand: '',
    dailyPrice: '',
    description: ''
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Création de l'objet voiture avec la Factory
    const carData = {
      ...data,
      ...createCar(vehicleType, data) // Fusion des données de base et des spécificités
    };

    const formData = new FormData();
    formData.append("model", carData.model);
    formData.append("brand", carData.brand);
    formData.append("dailyPrice", carData.dailyPrice);
    formData.append("description", carData.description);
    formData.append("category", carData.category); // Champ ajouté par la Factory
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/cars/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert("Véhicule ajouté avec succès!");
        setData({
          model: '',
          brand: '',
          dailyPrice: '',
          description: ''
        });
        setVehicleType('standard');
        setPreview(assets.upload_area);
        setImage(null);
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout du véhicule");
    }
  };

  return (
    <div className="ajout-container">
      <h2>Ajouter un nouveau véhicule</h2>
      <form onSubmit={onSubmitHandler}>
        {/* Section image (inchangée) */}
        <div className="image-upload">
          <label htmlFor="file-input">
            <img src={preview} alt="Preview" className="preview-image" />
          </label>
          <input
            id="file-input"
            type="file"
            onChange={handleImageChange}
            hidden
            accept="image/*"
          />
        </div>

        {/* Champs existants */}
        <input
          type="text"
          name="model"
          value={data.model}
          placeholder="Modèle"
          onChange={onChangeHandler}
          required
        />

        <input
          type="text"
          name="brand"
          value={data.brand}
          placeholder="Marque"
          onChange={onChangeHandler}
          required
        />

        <textarea
          name="description"
          value={data.description}
          placeholder="Description"
          onChange={onChangeHandler}
          required
        />

        <input
          type="number"
          name="dailyPrice"
          value={data.dailyPrice}
          placeholder="Prix journalier (FCFA)"
          onChange={onChangeHandler}
          required
        />

        {/* Nouveau sélecteur - à placer où vous voulez */}
        <div className="form-group">
          <label>Type de véhicule :</label>
          <select
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            required
          >
            <option value="standard">Standard</option>
            <option value="premium">Premium</option>
            <option value="electric">Électrique</option>
          </select>
        </div>

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AjoutVehicule;