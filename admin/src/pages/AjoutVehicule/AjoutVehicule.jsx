import React, { useState } from 'react';
import './AjoutVehicule.css';
import { assets } from '../../assets/assets';
import axios from "axios";

function AjoutVehicule({url}) {
  const [preview, setPreview] = useState(assets.upload_area);
  const [image, setImage] = useState(null);
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

    const formData = new FormData();
    formData.append("model", data.model);
    formData.append("brand", data.brand);
    formData.append("dailyPrice", data.dailyPrice);
    formData.append("description", data.description);
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

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default AjoutVehicule;