import React, { useState } from 'react'
import Navbar from './Composants/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Com from './pages/Commandes/Com'
import Panier from './pages/Panier/Panier'
import LoginPopup from './Composants/LoginPopup/LoginPopup'
import MesCom from './pages/MesCommandes/MesCom'

function App() {
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
      {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : null}
      <div className='app'>
        <Navbar setShowLogin={setShowLogin}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/com' element={<Com/>}/>
          <Route path='/panier' element={<Panier/>}/>
          <Route path='/mescom' element={<MesCom/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App