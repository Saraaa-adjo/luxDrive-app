// controllers/rentalController.js
import Rental from "../models/rentalModel.js";
import CarModel from "../models/CarModel.js";
import ClientModel from "../models/clientModel.js";


const createRental = async (req, res) => {
    try {
        const { carId, clientId, startDate, endDate } = req.body;
        
        // Vérifier la disponibilité de la voiture
        const car = await CarModel.findByPk(carId);
        if (!car || !car.isAvailable) {
            return res.status(400).json({ success: false, message: "Voiture non disponible" });
        }

        // Vérifier le client
        const client = await ClientModel.findByPk(clientId);
        if (!client) {
            return res.status(404).json({ success: false, message: "Client non trouvé" });
        }

        // Calcul du prix total
        const days = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
        const totalPrice = days * car.dailyPrice;
        
    
        const rental = await Rental.create({
            carId,
            clientId,
            startDate,
            endDate,
            totalPrice,
            status: 'active'
        });

        // Mettre à jour la disponibilité de la voiture
        await car.update({ isAvailable: false });

        notify('LOCATION_CREATED', { clientId, carId });
        
        res.status(201).json({ 
            success: true, 
            message: "Location créée",
            data: rental
        });
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const processEarlyReturn = async (req, res) => {
    try {
        const { rentalId, actualEndDate } = req.body;
        const rental = await Rental.findByPk(rentalId);
        
        if (!rental || rental.status !== 'active') {
            return res.status(400).json({ success: false, message: "Location invalide" });
        }

        // Calcul du prix ajusté
        const car = await CarModel.findByPk(rental.carId);
        const actualDays = (new Date(actualEndDate) - new Date(rental.startDate)) / (1000 * 60 * 60 * 24);
        const adjustedPrice = actualDays * car.dailyPrice;

        // Mettre à jour la location
        await rental.update({
            actualEndDate,
            adjustedPrice,
            status: 'early_return'
        });

        // Rendre la voiture disponible
        await car.update({ isAvailable: true });

        res.json({ 
            success: true, 
            message: "Retour anticipé enregistré",
            data: {
                originalPrice: rental.totalPrice,
                adjustedPrice,
                daysSaved: ((new Date(rental.endDate) - new Date(actualEndDate)) / (1000 * 60 * 60 * 24))
            }
        });
    } catch (error) {
        console.error("Erreur:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// controllers/rentalController.js
const getAllRentals = async (req, res) => {
    try {
      const rentals = await Rental.findAll({
        include: [
          { 
            model: CarModel,
            as: 'Car',
            attributes: ['id', 'brand', 'model', 'dailyPrice'] 
          },
          { 
            model: ClientModel,
            as: 'Client',
            attributes: ['id', 'firstName', 'lastName', 'email', 'phone'] 
          }
        ],
        order: [['startDate', 'DESC']]
      });
  
      const formattedRentals = rentals.map(rental => {
        const endDate = rental.actualEndDate || rental.endDate;
        const days = Math.ceil((new Date(endDate) - new Date(rental.startDate)) / (1000 * 60 * 60 * 24));
        const finalPrice = rental.adjustedPrice || (days * (rental.Car?.dailyPrice || 0));
        
        // Conversion en FCFA (1€ = 655.957 FCFA)
        const finalPriceFCFA = Math.round(finalPrice);
        
        return {
          ...rental.get({ plain: true }),
          finalPrice: finalPriceFCFA,
          days: Math.max(1, Math.floor(days)),
          Car: rental.Car || null,
          Client: rental.Client || null
        };
      });
  
      res.json({
        success: true,
        data: formattedRentals
      });
    } catch (error) {
      console.error("Erreur:", error);
      res.status(500).json({ 
        success: false, 
        message: "Erreur serveur",
        error: error.message 
      });
    }
  };
  const terminateRental = async (req, res) => {
  console.log('Début de terminateRental'); // Log 1
  try {
    const { id } = req.params;
    console.log('ID de location:', id); // Log 2

    const rental = await Rental.findByPk(id, {
      include: [{
        model: CarModel, // <-- très important
        as: 'Car',
        required: true
      }]
    });

    console.log('Location trouvée:', rental ? rental.id : 'null'); // Log 3

    if (!rental) {
      console.log('Location non trouvée');
      return res.status(404).json({ success: false, message: "Location non trouvée" });
    }

    if (rental.status === 'terminé') {
      console.log('Location déjà terminée');
      return res.status(400).json({ success: false, message: "Location déjà terminée" });
    }

    console.log('Mise à jour de la location...');
    const updatedRental = await rental.update({
      status: 'terminé',
      actualEndDate: new Date()
    });

    console.log('Mise à jour de la voiture...');
    await rental.Car.update({ isAvailable: true }); // 🔧 ici aussi

    console.log('Terminaison réussie');
    res.json({ 
      success: true, 
      message: "Location terminée avec succès",
      data: updatedRental
    });
  } catch (error) {
    console.error("Erreur complète:", {
      message: error.message,
      stack: error.stack,
      original: error.original
    });
    res.status(500).json({ 
      success: false, 
      message: "Erreur serveur",
      error: error.message 
    });
  }
};

  export { createRental, processEarlyReturn, getAllRentals, terminateRental };