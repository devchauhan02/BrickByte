import express from "express";
import { createResidency , getAllResidencies, getResidencyById, deleteResidency} from "../controllers/residencyController.js";
import jwtCheck from "../config/auth0Config.js";
const router = express.Router();

router.post("/create", jwtCheck, createResidency);
router.get("/getAll", getAllResidencies);
router.get("/:id", getResidencyById);
router.delete("/delete/:id", jwtCheck, deleteResidency);


export {router as residencyRoute};
