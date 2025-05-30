import { PrismaClient } from "@prisma/client";
import { HTTPResponse } from "../../utils/HTTPResponseHandler";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { hash_saltRounds } from "../../../config/config";
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    const response = new HTTPResponse(res);
    try {
        const { firstname, lastname, email, password, avatar, bio, phone } = req.body;
        const hashedPassword = await bcrypt.hash(password, hash_saltRounds);
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
        emailAlreadyExists && response.badRequest("Email already exists")
        phoneAlreadyExists && response.badRequest("Phone number already exists")

        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword,
                avatar,
                bio,
                phone
            },
        });
        response.created(newUser, "User created successfully")
    } catch (error) {
        console.error('Error creating user:', error);
        response.internalServerError("Internal server error");
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

export const updateUser = async (req: Request, res: Response) => {
    const id = req.params.id;
    const response = new HTTPResponse(res);

    try {
        const updatedUser = await prisma.user.update({
            where: { id },
            data: req.body,
        });

        return response.success(updatedUser, "User updated successfully");
    } catch (error) {
        console.error("Update user error:", error);
        return response.error(500, "Internal server error");
    }
};

