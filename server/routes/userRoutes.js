import { createUser , bookVisit, allBookings, cancelBooking} from "../controllers/userController.js";
import express from "express";
const router = express.Router();

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit);
router.get("/allBookings" , allBookings);
router.post("/cancelBooking/:id" , cancelBooking);

export {router as userRoute};
