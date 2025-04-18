// routes/rentalRoutes.js (modifié)
import express from "express";
import {
  createRental,
  processEarlyReturn,
  getAllRentals // Nouvelle fonction à importer
} from "../controllers/rentalController.js";

const rentalRouter = express.Router();

rentalRouter.get("/", getAllRentals); // Nouvelle route GET
rentalRouter.post("/", createRental);
rentalRouter.put("/:id/retour", processEarlyReturn); // Changé de POST à PUT pour la sémantique

export default rentalRouter;