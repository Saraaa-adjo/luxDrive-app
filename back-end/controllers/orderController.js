import Order from "../models/orderModel.js";

// Créer une nouvelle commande
const placeOrder = async (req, res) => {
  try {
    // Validation des données
    if (!req.body.items || !Array.isArray(req.body.items)) {
      return res.status(400).json({ success: false, message: "Items doit être un tableau" });
    }
    
    if (!req.body.amount || isNaN(req.body.amount)) {
      return res.status(400).json({ success: false, message: "Montant invalide" });
    }
    
    if (!req.body.address || typeof req.body.address !== 'object') {
      return res.status(400).json({ success: false, message: "Adresse invalide" });
    }

    const newOrder = await Order.create({
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    
    res.status(201).json({ 
      success: true, 
      message: "Commande passée avec succès",
      data: {
        orderId: newOrder.id,
        status: newOrder.status,
        createdAt: newOrder.createdAt
      }
    });
    
  } catch (error) {
    console.error("Erreur de commande:", error);
    res.status(500).json({ 
      success: false, 
      message: "Erreur interne du serveur",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Lister toutes les commandes
const getAllOrders = async (req, res) => {
  try {
    // Options de pagination (facultatif)
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    // Récupération des commandes avec pagination
    const orders = await Order.findAll({
      limit,
      offset,
      order: [['createdAt', 'DESC']] // Tri par date décroissante
    });

    // Compte total pour la pagination
    const totalOrders = await Order.count();

    res.status(200).json({
      success: true,
      data: orders,
      pagination: {
        total: totalOrders,
        page,
        pages: Math.ceil(totalOrders / limit),
        limit
      }
    });
  } catch (error) {
    console.error("Erreur de récupération:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la récupération des commandes",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

// Supprimer une commande
const deleteOrder = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Vérifier si la commande existe
    const order = await Order.findByPk(orderId);
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Commande non trouvée"
      });
    }

    // Suppression de la commande
    await order.destroy();

    res.status(200).json({
      success: true,
      message: "Commande supprimée avec succès"
    });
  } catch (error) {
    console.error("Erreur de suppression:", error);
    res.status(500).json({
      success: false,
      message: "Erreur lors de la suppression de la commande",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validation du statut
    const validStatuses = ['En préparation', 'Livraison imminente', 'Livrée', 'Annulée'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ 
        success: false, 
        message: "Statut invalide" 
      });
    }

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ 
        success: false, 
        message: "Commande non trouvée" 
      });
    }

    // Empêcher les modifications si la commande est déjà livrée ou annulée
    if (order.status === 'Livrée' || order.status === 'Annulée') {
      return res.status(400).json({ 
        success: false, 
        message: "Impossible de modifier une commande livrée ou annulée" 
      });
    }

    await order.update({ status });
    
    res.status(200).json({ 
      success: true, 
      message: "Statut de la commande mis à jour",
      data: order
    });
    
  } catch (error) {
    console.error("Erreur de mise à jour:", error);
    res.status(500).json({ 
      success: false, 
      message: "Erreur interne du serveur",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}
export { placeOrder, getAllOrders, deleteOrder,updateOrderStatus};