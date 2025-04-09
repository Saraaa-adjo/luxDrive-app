import React, { useState } from 'react';
import './Ajout.css';
import { assets } from '../../assets/assets';
import axios from "axios";

function Ajout({url}) {
  const [preview, setPreview] = useState(assets.upload_area);
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    restaurant: 'Chez Fatou',
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
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("restaurant", data.restaurant);
    formData.append("price", data.price);
    if (image) formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        alert("Plat ajouté avec succès!");
        setData({
          name: '',
          description: '',
          price: '',
          restaurant: 'Chez Fatou',
        });
        setPreview(assets.upload_area);
        setImage(null);
      }
    } catch (error) {
      console.error("Erreur:", error.response?.data?.message || error.message);
      alert("Erreur lors de l'ajout du plat");
    }
  };

  return (
    <div className="ajout-container">
      <h2>Ajouter un nouveau plat</h2>
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
          name="name"
          value={data.name}
          placeholder="Nom du plat"
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

        <select
          name="restaurant"
          value={data.restaurant}
          onChange={onChangeHandler}
          required
        >
          <option value="Chez Fatou">Chez Fatou</option>
          <option value="Le Délice Royal">Le Délice Royal</option>
          <option value="Grill House">Grill House</option>
          <option value="Saveurs Africaines">Saveurs Africaines</option>
          <option value="DOLCE PLAZZA">DOLCE PLAZZA</option>
          <option value="LA RIVIERA">LA RIVIERA</option>
          <option value="CHEZ KOUDJO">CHEZ KOUDJO</option>
          <option value="Saveurs Africaines">BIEN ETRE</option>
        </select>

        <input
          type="number"
          name="price"
          value={data.price}
          placeholder="Prix (FCFA)"
          onChange={onChangeHandler}
          required
        />

        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}

export default Ajout;