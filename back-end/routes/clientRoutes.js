import express from "express";
import { 
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient
} from "../controllers/clientController.js";

const router = express.Router();

// Routes CRUD pour les clients
router.post("/", createClient);
router.get("/", getAllClients);
router.get("/:id", getClientById);
router.put("/:id", updateClient);
router.delete("/:id", deleteClient);

export default router;