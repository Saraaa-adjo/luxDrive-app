import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import carRouter from "./routes/carRoutes.js";
import rentalRouter from "./routes/rentalRoutes.js";
import clientRouter from "./routes/clientRoutes.js";
import "./models/index.js";

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à la base de données
connectDB();

// Routes
app.use("/api/cars", carRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/clients", clientRouter);

// Gestion des images
app.use("/images", express.static('uploads'));

// Route de test
app.get("/", (req, res) => {
  res.send("API Location de voitures - Fonctionnel");
});

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});