import React, { useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
function LoginPopup({setShowLogin}) {
    const [currState,setCurrState]=useState("Login")

  return (
    <div className='login-popup'>
      <form className="login-popup-container">
        <div className="login-popup-title">
            <h2>{currState}</h2>
            <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="" />
        </div>
        <div className="login-popup-inputs">
            {currState==="Login"?<></>:            <input type="text" placeholder='votre nom' required/>
            }
            <input type="email" placeholder='votre mail' required/>
            <input type="password" placeholder='Votre mot de passe' required/>
        </div>
        <button>{currState==="Sign Up"?"Create account":"Login"}</button>
        <div className="login-popup-condition">
            <input type='checkbox' required/>
            <p>J'ai lu et j'accepte que mes données soient utilisées</p>
        </div>
        {setCurrState==="Login"
        ?<p>Créer un compte <span onClick={()=>setCurrState("Sign Up")}>Cliquez ici</span></p>

         :<p>Vous avez déjà un compte <span onClick={()=>setCurrState("Login")}>Connectez vous</span></p>

        }
      </form>
    </div>
  )
}

export default LoginPopup
