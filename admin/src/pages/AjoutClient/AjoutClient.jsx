import React, { useState } from 'react'
import axios from 'axios'
import './AjoutClient.css'

function AjoutClient({ url }) {
  const [client, setClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setClient(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post(`${url}/api/clients`, client)
      alert('Client ajouté avec succès!')
      setClient({
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      })
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de l\'ajout du client')
    }
  }

  return (
    <div className="ajout-client">
      <h2>Ajouter un Client</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Prénom</label>
          <input
            type="text"
            name="firstName"
            value={client.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Nom</label>
          <input
            type="text"
            name="lastName"
            value={client.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={client.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Téléphone</label>
          <input
            type="tel"
            name="phone"
            value={client.phone}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Enregistrer</button>
      </form>
    </div>
  )
}

export default AjoutClient