import FoodModel from "../models/foodModel.js";
import fs from 'fs';

const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Aucune image téléchargée" });
    }

    try {
        const food = await FoodModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            restaurant: req.body.restaurant,
            image: req.file.filename
        });
        res.json({ success: true, message: "Plat ajouté", data: food });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const listFood = async (req, res) => {
    try {
        const foods = await FoodModel.findAll({
            attributes: [
                'id',
                'name',
                'description',
                'price',
                'image',
                ['restaurant', 'category'] // Transformation ici
            ]
        });

        // Formatage pour le frontend
        const responseData = foods.map(item => ({
            _id: item.id, // Conversion en _id
            ...item.dataValues
        }));

        res.json({ 
            success: true, 
            data: responseData 
        });
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// Gardez les autres méthodes (addFood, updateFood) avec 'restaurant'

const removeFood = async (req, res) => {
    try {
        const food = await FoodModel.findByPk(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Plat non trouvé" });
        }

        fs.unlink(`uploads/${food.image}`, (err) => {
            if (err) console.log("Erreur lors de la suppression de l'image:", err);
        });

        await food.destroy();
        res.json({ success: true, message: "Plat supprimé" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};
// Ajoutez ces nouvelles fonctions à votre foodController.js existant

const getFoodById = async (req, res) => {
  try {
      const food = await FoodModel.findByPk(req.params.id);
      if (!food) {
          return res.status(404).json({ success: false, message: "Plat non trouvé" });
      }
      res.json({ success: true, data: food });
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
  }
};

const updateFood = async (req, res) => {
  try {
      const food = await FoodModel.findByPk(req.params.id);
      if (!food) {
          return res.status(404).json({ success: false, message: "Plat non trouvé" });
      }

      const updatedData = {
          name: req.body.name || food.name,
          description: req.body.description || food.description,
          price: req.body.price || food.price,
          restaurant: req.body.restaurant || food.restaurant
      };

      if (req.file) {
          // Supprimer l'ancienne image si une nouvelle est fournie
          fs.unlink(`uploads/${food.image}`, (err) => {
              if (err) console.log("Erreur suppression ancienne image:", err);
          });
          updatedData.image = req.file.filename;
      }

      await food.update(updatedData);
      res.json({ success: true, message: "Plat modifié", data: food });
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
  }
};

export { addFood, listFood, removeFood, getFoodById, updateFood };
