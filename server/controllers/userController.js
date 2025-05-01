import { prisma } from "../config/prismaConfig.js";
import expressAsyncHandler from "express-async-handler";

export const createUser = expressAsyncHandler(async (req, res) => {
    
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
        return res.status(201).json({ message: "User already exists" });
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
    try {
        const alreadyBooked = await prisma.user.findUnique({
            where: { email: email },
            select: { bookedVisits: true } //list of all booked visits made by the user
        });
        if (alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            return res.status(400).json({ message: "Visit already booked" });
        }

        const visit = await prisma.user.update({
            where: {
                email
            },
            data: {
                bookedVisits: { push: { date: date, id: id } } //push the new visit to the list of booked visits
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
    const { email } = req.body;
    try {
        const booking = await prisma.user.findUnique({
            where: {
                email
            },
            select: { bookedVisits: true }
        })
        res.status(200).send(booking)
    }
    catch (err) {
        throw new Error(err.message)
    }
})
export const cancelBooking = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
            select: { bookedVisits: true }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const index = user.bookedVisits.findIndex((visit) => visit.id === id);

        if (index === -1) {
            return res.status(404).json({ message: "Booking not found or has already been canceled" });
        }

        const updatedVisits = [...user.bookedVisits];
        updatedVisits.splice(index, 1);

        await prisma.user.update({
            where: { email },
            data: {
                bookedVisits: updatedVisits
            }
        });

        res.send({ message: "Booking canceled successfully" });
    } catch (err) {
        console.error("Error canceling booking:", err.message);
        res.status(500).json({ message: "Internal server error" });
    }
});
// add residency to fav
export const addToFav = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { email: email }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.favResidenciesID.includes(id)) {
            const updateUser = await prisma.user.update({
                where: { email },
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((favId) => favId !== id)
                    }
                }
            });
            return res.send({
                message: "Removed from favorites successfully",
                user: updateUser
            });
        }

        const updateUser = await prisma.user.update({
            where: { email },
            data: {
                favResidenciesID: {
                    push: id
                }
            }
        });
        return res.send({
            message: "Added to favorites successfully",
            user: updateUser
        });
    } catch (error) {
        console.error("Error adding/removing favorite:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export const removeFromFav = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    const { id } = req.params;

    try {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.favResidenciesID.includes(id)) {
            return res.status(400).json({ message: "Residency not in favorites" });
        }

        const updatedUser = await prisma.user.update({
            where: { email },
            data: {
                favResidenciesID: {
                    set: user.favResidenciesID.filter(favId => favId !== id)
                }
            }
        });

        res.send({
            message: "Removed from favorites",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error removing from favorites:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

export const getAllFav = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    try {
      const user = await prisma.user.findUnique({
        where: { email },
        select: { favResidenciesID: true }
      });
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.send({
        message: "Favorites fetched successfully",
        favourites: user.favResidenciesID,
      });
    } catch (error) {
      console.error("Error fetching favorites:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  