import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ _id, name, price, description, image, category }) => {
    const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

    if (!_id) {
        console.error("ID manquant pour le plat:", name);
        return null;
    }

    const imageUrl = image ? `${url}/images/${image}` : assets.placeholder_food;

    return (
        <div className='food-item'>
            <div className="food-item-img-container">
                <img 
                    className='food-item-image' 
                    src={imageUrl}
                    alt={name}
                    onError={(e) => {
                        e.target.src = assets.placeholder_food;
                        e.target.onerror = null;
                    }}
                />
                
                {!cartItems[_id] ? (
                    <img 
                        className='add' 
                        onClick={() => addToCart(_id)} 
                        src={assets.add_icon_white} 
                        alt="Ajouter au panier"
                    />
                ) : (
                    <div className="food-item-counter">
                        <img 
                            onClick={() => removeFromCart(_id)} 
                            src={assets.remove_icon_red} 
                            alt="Diminuer quantité"
                        />
                        <p>{cartItems[_id]}</p>
                        <img 
                            onClick={() => addToCart(_id)} 
                            src={assets.add_icon_green} 
                            alt="Augmenter quantité"
                        />
                    </div>
                )}
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p>
                    <img src={assets.rating_starts} alt="Note" />
                </div>
                <p className="food-item-desc">{description}</p>
                <div className="food-item-bottom">
                    <p className="food-item-price">{price} FCFA</p>
                    {category && <p className="food-item-category">{category}</p>}
                </div>
            </div>
        </div>
    );
};

export default React.memo(FoodItem);