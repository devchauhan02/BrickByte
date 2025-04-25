import { createUser , bookVisit} from "../controllers/userController.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);

export {router as userRoute};
