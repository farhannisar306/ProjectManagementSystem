import { PrismaClient } from "@prisma/client";
import { HTTPResponse } from "../../utils/HTTPResponseHandler";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { hash_saltRounds } from "../../../config/config";
import { sendActivationMail } from "../../utils/manage-mail-activation";

const prisma = new PrismaClient();

const createUser = async (req: Request, res: Response) => {
    const response = new HTTPResponse(res);
    try {
        const { username, email, password, avatar, bio, phone } = req.body;
        // Check if email already exists
        const emailAlreadyExists = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (emailAlreadyExists) {
            return response.badRequest("Email already exists");
        }

        // Check if phone already exists (if provided)
        if (phone) {
            const phoneAlreadyExists = await prisma.user.findUnique({
                where: {
                    phone: phone,
                }
            });

            if (phoneAlreadyExists) {
                return response.badRequest("Phone number already exists");
            }
        }

        const hashedPassword = await bcrypt.hash(password, hash_saltRounds);

        // Create the user
        prisma.user.create({
            data: {
                username,
                domain: `${email.split("@")[0]}`,
                email,
                password: hashedPassword,
                avatar,
                bio,
                phone,
                isVerified: false,
            },
        }).then((created_user) => {
            sendActivationMail(created_user.email)
            return response.success({ latestCreatedUser: created_user, }, "User created successfully, and the activation mail has been sent");
        });
    } catch (error) {
        console.error('Error creating user:', error);
        return response.internalServerError("Internal server error");
    }
}

const deleteUser = async (req: Request, res: Response) => {
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

const updateUser = async (req: Request, res: Response) => {
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
}

export const userController = {
    createUser,
    deleteUser,
    updateUser,
};