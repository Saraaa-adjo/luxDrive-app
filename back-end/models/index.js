// models/index.js
import sequelize from "../config/db.js";
import Car from "./CarModel.js";
import Client from "./clientModel.js";
import Rental from "./rentalModel.js";

// Exécuter les associations
const models = {
  Car,
  Client,
  Rental,
};

// Appeler associate sur chaque modèle
Object.values(models).forEach((model) => {
  if (typeof model.associate === "function") {
    model.associate(models);
  }
});

export { sequelize };
export default models;
