import express from "express";
import { 
  addFood, 
  listFood, 
  removeFood,
  getFoodById,  // Ajoutez cette importation
  updateFood    // Ajoutez cette importation
} from "../controllers/foodController.js";
import multer from "multer";

const foodRouter = express.Router();

// Configuration du stockage
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}_${file.originalname}`);
    }      
});
const upload = multer({ storage: storage });

// Routes
foodRouter.post("/add", upload.single("image"), addFood);
foodRouter.get("/list", listFood);
foodRouter.delete("/remove", removeFood);

// Nouvelles routes ajoutées
foodRouter.get("/:id", getFoodById);
foodRouter.put("/:id", upload.single("image"), updateFood);

export default foodRouter;