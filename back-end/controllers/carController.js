// controllers/carController.js
import CarModel from '../models/CarModel.js';
import fs from 'fs';

const addCar = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "Aucune image téléchargée" });
    }

    try {
        const car = await CarModel.create({
            model: req.body.model,
            brand: req.body.brand,
            dailyPrice: req.body.dailyPrice,
            image: req.file.filename,
            isAvailable: true
        });
        res.json({ success: true, message: "Voiture ajoutée", data: car });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const listCars = async (req, res) => {
    try {
        const cars = await CarModel.findAll();
        res.json({ success: true, data: cars });
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const removeCar = async (req, res) => {
    try {
        const id = req.params.id; // 🔥 important : lire depuis params
        const car = await CarModel.findByPk(id);

        if (!car) {
            return res.status(404).json({ success: false, message: "Voiture non trouvée" });
        }

        fs.unlink(`uploads/${car.image}`, (err) => {
            if (err) console.log("Erreur lors de la suppression de l'image:", err);
        });

        await car.destroy();
        res.json({ success: true, message: "Voiture supprimée" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};


const getAvailableCars = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        // Implémentez la logique de vérification des disponibilités
        const availableCars = await CarModel.findAll({
            where: { isAvailable: true }
            // Ajouter la vérification des dates ici
        });
        
        res.json({ success: true, data: availableCars });
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
const updateDisponibilite = async (req, res) => {
    try {
        const { id } = req.params;
        const { isAvailable } = req.body;

        const car = await CarModel.findByPk(id);

        if (!car) {
            return res.status(404).json({ success: false, message: "Voiture non trouvée" });
        }

        car.isAvailable = isAvailable;
        await car.save();

        res.json({ success: true, message: "Disponibilité mise à jour", data: car });
    } catch (error) {
        console.error("Erreur updateDisponibilite:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


export { addCar, listCars, removeCar, getAvailableCars ,updateDisponibilite };