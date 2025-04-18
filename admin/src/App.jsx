import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import ListeClients from './pages/ListeClients/ListeClients.jsx'
import ListeVoitures from './pages/ListeVoitures/ListeVoitures.jsx'
import AjoutVehicule from './pages/AjoutVehicule/AjoutVehicule.jsx'
import AjoutClient from './pages/AjoutClient/AjoutClient.jsx'
import GestionLocations from './pages/GestionLocations/GestionLocations.jsx'
import AjoutLocation from './pages/AjoutLocation/AjoutLocation.jsx'
import RechercheVoitures from './pages/RechercheVoitures/RechercheVoitures.jsx'
import './index.css'

function App() {
  const Url = "http://localhost:4000"
  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/admin/voitures/ajouter" element={<AjoutVehicule url={Url} />} />
            <Route path="/admin/voitures" element={<ListeVoitures url={Url} />} />
            <Route path="/admin/recherches" element={<RechercheVoitures url={Url} />} />

            
            <Route path="/admin/clients/ajouter" element={<AjoutClient url={Url} />} />
            <Route path="/admin/clients" element={<ListeClients url={Url} />} />
            
            <Route path="/admin/locations/nouvelle" element={<AjoutLocation url={Url} />} />
            <Route path="/admin/locations" element={<GestionLocations url={Url} />} />

            
            <Route path="/" element={<ListeVoitures url={Url} />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App