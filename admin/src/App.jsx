import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import './index.css'
import Liste from './pages/Liste/Liste'
import Commandes from './pages/Commandes/Commandes'
import Ajout from './pages/Ajouter/Ajout'


function App() {
  const Url = "http://localhost:4000";
  return (
    <div className="app">
      <Navbar />
      <div className="app-body">
        <Sidebar />
        <div className="content">
          <Routes>     
            <Route path="/ajout" element={<Ajout url={Url}/>} />
            <Route path="/liste" element={<Liste url={Url}/>} />
            <Route path="/commandes" element={<Commandes url={Url}/>} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
