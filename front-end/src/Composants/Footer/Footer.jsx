import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3>Navigation</h3>
          <ul>
            <li><a href="/">Accueil</a></li>
            <li><a href="/menu">Menu</a></li>
            <li><a href="/reservation">Réservation</a></li>
            <li><a href="/galerie">Galerie</a></li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Contact</h3>
          <ul>
            <li>123 Rue du Restaurant</li>
            <li>75000 Paris</li>
            <li>Tél: 01 23 45 67 89</li>
            <li>contact@monrestaurant.com</li>
          </ul>
        </div>

        <div className="footer-column">
          <h3>Horaires</h3>
          <ul>
            <li>Lundi - Vendredi: 11h-15h / 18h-23h</li>
            <li>Samedi: 11h-23h</li>
            <li>Dimanche: 11h-17h</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Mon Restaurant - Tous droits réservés</p>
      </div>
    </footer>
  );
}

export default Footer;