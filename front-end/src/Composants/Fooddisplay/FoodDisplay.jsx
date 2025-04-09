import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

function FoodDisplay({ categorie }) {
    const { food_list } = useContext(StoreContext);
    
    return (
        <div className='food-display' id='food-display'>
            <h2>Les plats les plus frais devant vous</h2>
            <div className="food-display-list">
                {food_list.map((item) => {
                    if (categorie === "All" || categorie === item.category) {
                        return (
                            <FoodItem 
                                key={item._id}
                                _id={item._id} // Changé de id à _id
                                name={item.name}
                                description={item.description}
                                price={item.price}
                                image={item.image}
                                category={item.category}
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
}

export default FoodDisplay;