import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./commandes.css";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { assets } from '../../assets/assets';

function Commandes({ url }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token] = useState(localStorage.getItem('adminToken')); // Récupération directe du token

  // Fonction pour charger les commandes
  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order`, {
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      setOrders(response.data.data || []);
    } catch (error) {
      console.error("Erreur:", error);
      toast.error("Erreur lors du chargement des commandes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [url, token]);

  // Fonction pour accepter une commande
  const handleAcceptOrder = async (orderId) => {
    try {
      await axios.put(
        `${url}/api/order/${orderId}/status`,
        { status: 'Livraison imminente' },
        {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success("Commande acceptée avec succès");
      fetchOrders(); // Recharger la liste
    } catch (error) {
      toast.error("Erreur lors de l'acceptation");
    }
  };

  // Fonction pour refuser une commande
  const handleRejectOrder = async (orderId) => {
    if (window.confirm("Êtes-vous sûr de vouloir refuser cette commande ?")) {
      try {
        await axios.delete(`${url}/api/order/${orderId}`, {
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        toast.success("Commande refusée avec succès");
        fetchOrders(); // Recharger la liste
      } catch (error) {
        toast.error("Erreur lors du refus");
      }
    }
  };

  // Fonction pour obtenir la couleur du statut
  const getStatusColor = (status) => {
    switch (status) {
      case 'En préparation': return '#FFA500';
      case 'Livraison imminente': return '#4169E1';
      case 'Livrée': return '#32CD32';
      case 'Annulée': return '#FF0000';
      default: return '#000000';
    }
  };

  if (loading) return <div className="loading">Chargement des commandes...</div>;

  return (
    <div className="commandes-container">
      <h1>Gestion des Commandes</h1>
      
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>Aucune commande à afficher</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h2>Commande #{order.id}</h2>
                <div className="order-client-info">
                  <p>{order.address?.firstName} {order.address?.lastName}</p>
                  <p>{order.address?.phone}</p>
                </div>
              </div>
              
              <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) }}>
                {order.status}
              </div>
              
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-image">
                      <img src={assets.parcel_icon} alt={item.name} />
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
                  <strong>Total: {order.amount} FCFA</strong>
                </div>
                
                <div className="order-actions">
                  {order.status === 'En préparation' && (
                    <>
                      <button 
                        onClick={() => handleAcceptOrder(order.id)} 
                        className="accept-button"
                      >
                        Accepter
                      </button>
                      <button 
                        onClick={() => handleRejectOrder(order.id)} 
                        className="reject-button"
                      >
                        Refuser
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Commandes;