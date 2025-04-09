import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './mescom.css';
import { assets } from '../../assets/assets';

function MesCom() {
  const { url, token, user } = useContext(StoreContext); // Ajout de user depuis le contexte
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/order`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error("Erreur de récupération:", error);
        alert("Erreur lors du chargement des commandes");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [url, token]);

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm("Êtes-vous sûr de vouloir annuler cette commande ?")) return;
    
    try {
      await axios.delete(`${url}/api/order/${orderId}`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setOrders(orders.filter(order => order.id !== orderId));
      alert("Commande annulée avec succès");
    } catch (error) {
      console.error("Erreur de suppression:", error);
      alert("Erreur lors de l'annulation de la commande");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'En préparation':
        return '#FFA500'; // Orange
      case 'Livraison imminente': // Ajout de ce cas
        return '#4169E1'; // Bleu royal
      case 'Livrée':
        return '#32CD32'; // Vert lime
      case 'Annulée':
        return '#FF0000'; // Rouge
      default:
        return '#000000'; // Noir
    }
  };
  

  if (loading) return <div className="loading">Chargement des commandes...</div>;

  return (
    <div className="mes-com-container">
      <h1>Mes Commandes</h1>
      {user && <div className="user-info">Client: {user.firstName} {user.lastName}</div>}
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>Aucune commande trouvée</p>
          <button onClick={() => navigate('/')} className="back-button">
            Retour à l'accueil
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h2>Commande #{order.id}</h2>
                <div>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                  {order.address && (
                    <div className="order-client">
                      Pour: {order.address.firstName} {order.address.lastName}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                {order.status}
              </div>
              
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-image">
                    <img src={assets.parcel_icon} alt="" />  
                    </div>
                    <div className="item-details">
                      <h3>{item.name}</h3>
                      <p>Quantité: {item.quantity}</p>
                      <p>Prix unitaire: {item.price} FCFA</p>
                      <p>Total: {item.price * item.quantity} FCFA</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="order-footer">
                <div className="order-total">
                  <strong>Total de la commande: {order.amount} FCFA</strong>
                </div>
                
                {order.status !== 'Annulée' && order.status !== 'Livrée' && order.status !== 'Livraison imminente' && (
                      <button 
                        onClick={() => handleCancelOrder(order.id)} 
                        className="cancel-button"
                      >
                        Annuler la commande
                      </button>
                    )}
              </div>
            </div>
          ))}
          
          <button onClick={() => navigate('/')} className="back-button">
            Retour à l'accueil
          </button>
        </div>
      )}
    </div>
  );
}

export default MesCom;