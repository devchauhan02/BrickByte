import { prisma } from "../config/prismaConfig.js";
import expressAsyncHandler from "express-async-handler";

export const createResidency = expressAsyncHandler(async (req, res) => {
    console.log("Creating residency...");
    const {title, description, address, city, country, image , facilities, userEmail, price} = req.body.data;
    if (!title || !description || !address || !city || !country || !image || !facilities || !userEmail || !price) {
        return res.status(400).json({ 
            message: "Missing fields", 
            missing: {
                title: !!title,
                description: !!description,
                address: !!address,
                city: !!city,
                country: !!country,
                image: !!image,
                facilities: !!facilities,
                userEmail: !!userEmail,
                price: !!price
            }
        });
    }
    
    const user = await prisma.user.findUnique({
        where: {
            email: userEmail,
        },
    });
    if (!user) {
        return res.status(400).json({ message: "User does not exist. Please Create one first" });
    }
    const residency = await prisma.residency.create({
        data: {
            title,
            description,
            address,
            city,
            country,
            image,
            facilities,
            owner : {connect : {email: userEmail}},
            price,

        },
    });
    if (residency) {
        return res.send({
            message: "Residency created successfully",
            residency: residency
        })
    } else {
        return res.status(400).json({ message: "Invalid residency data" });
    }
})

export const getAllResidencies = expressAsyncHandler(async (req, res) => {
    console.log("Getting all residencies...");
    const residencies = await prisma.residency.findMany({
        include: {
            owner: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    if (residencies) {
        return res.send({
            message: "Residencies fetched successfully",
            residencies: residencies
        })
    } else {
        return res.status(400).json({ message: "Invalid residency data" });
    }
})

export const getResidencyById = expressAsyncHandler(async (req, res) => {
    console.log("Getting residency by id...");
    const { id } = req.params;
    const residency = await prisma.residency.findUnique({
        where: {
            id
        },
        include: {
            owner: true,
        },
    });
    if (residency) {
        return res.send({
            message: "Residency fetched successfully",
            residency: residency
        })
    } else {
        return res.status(400).json({ message: "Invalid residency data" });
    }
})