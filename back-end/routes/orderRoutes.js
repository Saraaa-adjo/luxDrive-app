import express from "express";
import {
  placeOrder,
  getAllOrders,
  deleteOrder,
  updateOrderStatus
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Route pour créer une commande
orderRouter.post("/place", placeOrder);

// Route pour récupérer toutes les commandes
orderRouter.get("/", getAllOrders);

// Route pour supprimer une commande
orderRouter.delete("/:id", deleteOrder);

orderRouter.put("/:id/status", updateOrderStatus);


export default orderRouter;