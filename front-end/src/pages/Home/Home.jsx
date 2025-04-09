import React, { useState } from 'react'; 
import './home.css';
import Header from '../../Composants/Header/Header';
import ExploreMenu from '../../Composants/ExploreMenu/ExploreMenu';
import FoodDisplay from '../../Composants/Fooddisplay/FoodDisplay';
import FoodItem from '../../Composants/FoodItem/FoodItem';
import Footer from '../../Composants/Footer/Footer';

function Home() {
  const [categorie, setCategorie] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu categorie={categorie} setCategorie={setCategorie} />
      <FoodDisplay categorie={categorie}/>
      <Footer/>
    </div>
  );
}

export default Home;
