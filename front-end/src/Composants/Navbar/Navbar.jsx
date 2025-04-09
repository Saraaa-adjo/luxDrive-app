import React, { useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link } from 'react-router-dom';

function Navbar({setShowLogin}) {
    const [menu, setMenu] = useState("ACCEUIL");

    return (
        <div className="navbar">
        <img src={assets.logo} alt="logo" className="logo"/>
            <ul className="navbar-menu">
                <li onClick={() => setMenu("ACCEUIL")} className={menu === "ACCEUIL" ? "active" : ""}>ACCEUIL</li>
                <li onClick={() => setMenu("MENU")} className={menu === "MENU" ? "active" : ""}>restaurants</li>
                <li onClick={() => setMenu("CONTACTEZ-NOUS")} className={menu === "CONTACTEZ-NOUS" ? "active" : ""}>CONTACTEZ-NOUS</li>
            </ul>
            <div className="navbar-right">
                <img src={assets.search_icon} alt="search" />
                <div className="navbar-search-icon">
                    <Link to='/panier'><img src={assets.basket_icon} alt="basket" /></Link>
                    <div className="dot"></div>
                </div>
                <button onClick={()=>setShowLogin(true)}>CONNEXION</button>
            </div>
        </div>
    );
}

export default Navbar;
