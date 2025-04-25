import { createUser , bookVisit, allBookings, cancelBooking, addToFav} from "../controllers/userController.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.get("/allBookings" , allBookings);
router.post("/cancelBooking/:id" , cancelBooking);
router.post("/addToFav/:id" , addToFav);

export {router as userRoute};
