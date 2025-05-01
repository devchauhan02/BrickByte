import { prisma } from "../config/prismaConfig.js";
import expressAsyncHandler from "express-async-handler";

export const createResidency = expressAsyncHandler(async (req, res) => {
   
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

export const deleteResidency = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const residency = await prisma.residency.delete({
        where: {
          id: id,
        },
      });
  
      if (!residency) {
        return res.status(404).json({ message: "Residency not found" });
      }
  
      return res.status(200).json({ message: "Residency deleted successfully" });
    } catch (error) {
      console.error("Server error while deleting residency:", error); 
      return res.status(500).json({ message: "Server error while deleting the residency" });
    }
  });
  