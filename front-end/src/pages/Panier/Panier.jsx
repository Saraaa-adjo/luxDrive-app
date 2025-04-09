import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './panier.css';
import { StoreContext } from '../../context/StoreContext';

function Panier() {
    const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext); 
    const navigate = useNavigate();
    
    const itemsInCart = food_list.filter(item => item && item._id && cartItems[item._id] > 0);

    return (
        <div className='cart'>
            <div className="cart-items">
                <div className="cart-items-title">
                    <p>Image</p>
                    <p>Nom</p>
                    <p>Prix</p>
                    <p>Quantité</p>
                    <p>Total</p>
                    <p>Retirer</p>
                </div>
                <br />
                <hr />
                
                {itemsInCart.length > 0 ? (
                    itemsInCart.map((item) => (
                        <div key={item._id} className="cart-items-item">
                            <img src={`${url}/images/${item.image}`} alt={item.name} />
                            <p>{item.name}</p>
                            <p>{item.price} FCFA</p>
                            <p>{cartItems[item._id]}</p>
                            <p>{item.price * cartItems[item._id]} FCFA</p>
                            <p onClick={() => removeFromCart(item._id)} className="remove-icon">×</p>
                        </div>
                    ))
                ) : (
                    <p className="empty-cart">Votre panier est vide</p>
                )}
            </div>
            <div className="cart-bottom">
                <div className="cart-total">
                    <h2>Total du panier</h2>
                    <div>
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
                            <b>Total</b>
                            <b>{getTotalCartAmount() + 1000} FCFA</b>
                        </div>
                    </div>
                    <button onClick={() => navigate('/com')}>PAYER</button>
                </div>
            </div>
        </div>
    );
}

export default Panier;