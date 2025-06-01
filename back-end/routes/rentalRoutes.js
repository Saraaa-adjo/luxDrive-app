import express from "express";
import {
  createRental,
  processEarlyReturn,
  getAllRentals,
  terminateRental // Importez la nouvelle fonction
} from "../controllers/rentalController.js";

const rentalRouter = express.Router();

rentalRouter.get("/", getAllRentals);
rentalRouter.post("/", createRental);
rentalRouter.put("/:id/retour", processEarlyReturn);
// Ajoutez cette nouvelle route pour terminer une location
rentalRouter.put("/:id/terminer", terminateRental);

export default rentalRouter;