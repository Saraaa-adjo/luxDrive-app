import React, { useContext, useState } from 'react';
import './com.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Com() {
  const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "", // Changé de "Mail" à "email" pour la cohérence
    city: "", // Changé de "Ville" à "city"
    neighborhood: "", // Changé de "Quartier" à "neighborhood"
    phone: "" // Changé de "Telephone" à "phone"
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      // Préparer les articles de la commande
      const orderItems = food_list
        .filter((item) => cartItems[item._id] > 0)
        .map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          quantity: cartItems[item._id]
        }));

      // Préparer les données pour l'API
      const orderData = {
        items: orderItems,
        amount: getTotalCartAmount() + 1000,
        address: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          city: data.city,
          neighborhood: data.neighborhood,
          phone: data.phone
        }
      };

      // Envoyer la commande à l'API
      const response = await axios.post(`${url}/api/order/place`, orderData, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setData({
          firstName: "",
          lastName: "",
          email: "",
          city: "",
          neighborhood: "",
          phone: ""
        });
        alert("Commande passée avec succès!");
        navigate('/mescom'); 
        // navigate('/commande-confirmee');
      } else {
        throw new Error(response.data.message || "Erreur lors de la commande");
      }
    } catch (error) {
      console.error("Erreur:", error);
      alert(error.message || "Une erreur est survenue lors de la commande");
    } finally {
      setIsSubmitting(false);
    }
  };

  const navigate = useNavigate();

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-container">
        <div className="place-order-left">
          <p className="title">Informations de Livraison</p>
          <div className="multi-fields">
            <input 
              name="firstName" 
              onChange={onChangeHandler} 
              value={data.firstName} 
              type="text" 
              placeholder="Nom" 
              required 
            />
            <input 
              name="lastName" 
              onChange={onChangeHandler} 
              value={data.lastName} 
              type="text" 
              placeholder="Prénom" 
              required 
            />
          </div>
          <input 
            name="email" 
            onChange={onChangeHandler} 
            value={data.email} 
            type="email" 
            placeholder="Adresse email" 
            required 
          />
          <input 
            name="city" 
            onChange={onChangeHandler} 
            value={data.city} 
            type="text" 
            placeholder="Ville" 
            required 
          />
          <div className="multi-fields">
            <input 
              name="neighborhood" 
              onChange={onChangeHandler} 
              value={data.neighborhood} 
              type="text" 
              placeholder="Quartier" 
              required 
            />
            <input 
              name="phone" 
              onChange={onChangeHandler} 
              value={data.phone} 
              type="tel" 
              placeholder="Téléphone" 
              required 
            />
          </div>
        </div>

        <div className="place-order-right">
          <div className="cart-total">
            <h2>Total</h2>
            <div className="cart-total-details">
              <p>Sous-Total</p>
              <p>{getTotalCartAmount()} FCFA</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Frais de livraison</p>
              <p>1000 FCFA</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <b>{getTotalCartAmount() + 1000} FCFA</b>
            </div>
          </div>
          <div className="place-order-buttons">
            <button 
              type="button" 
              className="back-button" 
              onClick={() => navigate('/panier')}
              disabled={isSubmitting}
            >
              Retour au panier
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Commander'}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Com;