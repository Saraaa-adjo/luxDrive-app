import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

function ExploreMenu({categorie,setCategorie}) {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explorez Les restaurants</h1>
      <p className='explore-menu-text'>Des restaurants de haut standing qui vous feront voyager</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => ( // Ajout de `item` et `index`
          <div onClick={()=>setCategorie(prev=>prev===item.menu_name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
            <img className={categorie===item.menu_name?"active":""} src={item.menu_image} alt={item.menu_name} />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr/>
    </div>

  );
}

export default ExploreMenu;
