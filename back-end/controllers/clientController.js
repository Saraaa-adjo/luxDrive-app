import ClientModel from "../models/clientModel.js";

// Créer un nouveau client
const createClient = async (req, res) => {
  try {
    const { firstName, lastName, email, phone } = req.body;
    
    // Validation basique
    if (!firstName || !lastName || !email) {
      return res.status(400).json({ 
        success: false, 
        message: "Nom, prénom et email sont obligatoires" 
      });
    }

    const client = await ClientModel.create({
      firstName,
      lastName,
      email,
      phone
    });

    res.status(201).json({
      success: true,
      message: "Client créé avec succès",
      data: client
    });
  } catch (error) {
    console.error("Erreur création client:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la création du client",
      error: error.message
    });
  }
};

// Lister tous les clients
const getAllClients = async (req, res) => {
  try {
    const clients = await ClientModel.findAll();
    res.json({
      success: true,
      data: clients
    });
  } catch (error) {
    console.error("Erreur récupération clients:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des clients"
    });
  }
};

// Obtenir un client par ID
const getClientById = async (req, res) => {
  try {
    const client = await ClientModel.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client non trouvé"
      });
    }
    res.json({
      success: true,
      data: client
    });
  } catch (error) {
    console.error("Erreur récupération client:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération du client"
    });
  }
};

// Mettre à jour un client
const updateClient = async (req, res) => {
  try {
    const client = await ClientModel.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client non trouvé"
      });
    }

    await client.update(req.body);
    res.json({
      success: true,
      message: "Client mis à jour",
      data: client
    });
  } catch (error) {
    console.error("Erreur mise à jour client:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la mise à jour du client"
    });
  }
};

// Supprimer un client
const deleteClient = async (req, res) => {
  try {
    const client = await ClientModel.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client non trouvé"
      });
    }

    await client.destroy();
    res.json({
      success: true,
      message: "Client supprimé avec succès"
    });
  } catch (error) {
    console.error("Erreur suppression client:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression du client"
    });
  }
};

export { 
  createClient, 
  getAllClients, 
  getClientById, 
  updateClient, 
  deleteClient 
};