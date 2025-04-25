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
}
);
