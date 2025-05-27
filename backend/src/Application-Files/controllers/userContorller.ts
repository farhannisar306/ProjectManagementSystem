import { PrismaClient } from "@prisma/client";
import { HTTPResponse } from "../handlers/HTTPResponseHandler";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();



export const createUser = async (req: Request, res: Response) => {
    try {
        const response = new HTTPResponse(res);
        const { firstname, lastname, email, password, avatar, bio, address, phone } = req.body;

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const emailAlreadyExists = await prisma.user.findUnique({
            where: {
                email: email,
            }, 
        })

        const phoneAlreadyExists = await prisma.user.findUnique({
            where: {
                phone: phone, 
            }
        })

        if (emailAlreadyExists) {
            return response.badRequest("Email already exists") 
        }

        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                avatar,
                bio,
                address,
                phone
            },
        });
        response.created(newUser, "User created successfully")
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
};


export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params.id;

        const deletedUser = await prisma.user.delete({
            where: {
                id: userId,
            },
        });

        res.status(201).json({
            message: 'User Deleted successfully',
            user: deletedUser,
        });
    } catch (error) {
        console.error('Error Deleting user:', error);
        res.status(500).json({
            message: 'Internal server error',
        });
    }
}