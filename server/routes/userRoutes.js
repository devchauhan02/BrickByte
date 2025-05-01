import jwtCheck from "../config/auth0Config.js";
import { createUser , bookVisit, allBookings, cancelBooking, addToFav, removeFromFav, getAllFav} from "../controllers/userController.js";
import express from "express";
const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id",jwtCheck, bookVisit);
router.get("/allBookings" , jwtCheck, allBookings);
router.post("/cancelBooking/:id" , jwtCheck, cancelBooking);
router.post("/addToFav/:id" , jwtCheck, addToFav);
router.post("/removeFromFav/:id" , jwtCheck, removeFromFav);
router.get("/getAllFav" , jwtCheck, getAllFav);

export {router as userRoute};
