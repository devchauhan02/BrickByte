import { prisma } from "../config/prismaConfig.js";
import expressAsyncHandler from "express-async-handler";

export const createUser = expressAsyncHandler(async (req, res) => {
    console.log("Creating user...");
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    const userExists = await prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    if (userExists) {
        return res.status(400).json({ message: "User already exists" });
    }
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password,
        },
    });
    if (user) {
        return res.send({
            message: "User created successfully",
            user: user
        })
    } else {
        return res.status(400).json({ message: "Invalid user data" });
    }
});

export const bookVisit = expressAsyncHandler(async (req, res) => { 
    const { id } = req.params;
    const { date, email } = req.body;
    if (!date || !email) {
        return res.status(400).json({ message: "Please fill all fields" });
    }
    try{
        const alreadyBooked = await prisma.user.findUnique({
            where: {email: email},
            select: {bookedVisits: true} //list of all booked visits made by the user
        });
        if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            return res.status(400).json({ message: "Visit already booked" });
        }

        const visit = await prisma.user.update({
            where: {
                email
            },
            data: {
                bookedVisits : {push : {date: date, id: id}} //push the new visit to the list of booked visits
            },
        });
        return res.send({
            message: "Your Visit is booked successfully",
            visit: visit
        })
    } catch (error) {
        console.error("Error booking visit:", error);
        return res.status(500).json({ message: "Error booking visit" });
    }
}); 

export const allBookings = expressAsyncHandler(async (req, res) => {
    const {email} = req.body;
    try{
        const booking = await prisma.user.findUnique({
            where : {
                email
            },
            select: {bookedVisits: true}
        })
        res.status(200).send(booking)
    }
    catch(err){
        throw new Error(err.message)
    }
})