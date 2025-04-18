// routes/carRoutes.js
import express from "express";
import { 
  addCar, 
  listCars, 
  removeCar,
  getAvailableCars
} from "../controllers/carController.js";
import multer from "multer";

const carRouter = express.Router();

const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }      
});
const upload = multer({ storage: storage });

carRouter.post("/add", upload.single("image"), addCar);
carRouter.get("/list", listCars);
carRouter.get("/available", getAvailableCars);
carRouter.delete("/:id", removeCar);

export default carRouter;