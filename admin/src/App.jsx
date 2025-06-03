import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import Sidebar from './Components/Sidebar/Sidebar';
import ListeClients from './pages/ListeClients/ListeClients.jsx';
import ListeVoitures from './pages/ListeVoitures/ListeVoitures.jsx';
import AjoutVehicule from './pages/AjoutVehicule/AjoutVehicule.jsx';
import AjoutClient from './pages/AjoutClient/AjoutClient.jsx';
import GestionLocations from './pages/GestionLocations/GestionLocations.jsx';
import AjoutLocation from './pages/AjoutLocation/AjoutLocation.jsx';
import RechercheVoitures from './pages/RechercheVoitures/RechercheVoitures.jsx';
import Login from './Components/Login/Login.jsx';
import { subscribe } from './Pattern/notifications';
import './index.css';

function App() {
  const Url = import.meta.env.VITE_API_URL;
  const [loggedIn, setLoggedIn] = useState(false);

  // Subscribe to notifications
  subscribe((event, data) => {
  if (event === 'LOCATION_CREATED') {
    toast.success(`Location #${data.id} créée !`);
  }
});

  return (
    <div className="app">
      {loggedIn ? (
        <>
          <Navbar />
          <div className="app-body">
            <Sidebar />
            <div className="content">
              <Routes>
                {/* Routes Voitures */}
                <Route path="/admin/voitures/ajouter" element={<AjoutVehicule url={Url} />} />
                <Route path="/admin/voitures" element={<ListeVoitures url={Url} />} />
                <Route path="/admin/recherches" element={<RechercheVoitures url={Url} />} />
                
                {/* Routes Clients */}
                <Route path="/admin/clients/ajouter" element={<AjoutClient url={Url} />} />
                <Route path="/admin/clients" element={<ListeClients url={Url} />} />
                
                {/* Routes Locations */}
                <Route path="/admin/locations/nouvelle" element={<AjoutLocation url={Url} />} />
                <Route path="/admin/locations" element={<GestionLocations url={Url} />} />
                
                

                {/* Redirect to voitures by default */}
                <Route path="/" element={<Navigate to="/admin/voitures" />} />
              </Routes>
            </div>
          </div>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Login setLoggedIn={setLoggedIn} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </div>
  );
}

export default App;