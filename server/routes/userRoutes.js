import { createUser , bookVisit, allBookings, cancelBooking, addToFav, removeFromFav, getAllFav} from "../controllers/userController.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.get("/allBookings" , allBookings);
router.post("/cancelBooking/:id" , cancelBooking);
router.post("/addToFav/:id" , addToFav);
router.post("/removeFromFav/:id" , removeFromFav);
router.get("/getAllFav" , getAllFav);

export {router as userRoute};
