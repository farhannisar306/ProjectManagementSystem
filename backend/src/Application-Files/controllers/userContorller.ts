import { PrismaClient } from "@prisma/client";
import { HTTPResponse } from "../handlers/HTTPResponseHandler";
import { Request, response, Response } from 'express';
// import bcrypt from 'bcrypt';
import argon2 from 'argon2';
import { hash_saltRounds } from "../../config/config";
const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
    const response = new HTTPResponse(res);
    try {
        const { firstname, lastname, email, password, avatar, bio, address, phone } = req.body;
        // const hashedPassword = await bcrypt.hash(password, hash_saltRounds);
        const hashedPassword = await argon2.hash(password);
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
                address,
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
        const existingUser = await prisma.user.findUnique({ where: { id } });
        if (!existingUser) {
            return response.notFound("User not found");
        }
        const {
            firstname,
            lastname,
            email,
            password,
            avatar,
            bio,
            address,
            phone
        } = req.body;

        // Hash new password if provided
        let hashedPassword: string | undefined;
        if (password) {
            const isSamePassword = await argon2.verify(existingUser.password || '', password);

            if (isSamePassword) {
                return response.badRequest("New password cannot be the same as the current one");
            }

            hashedPassword = await argon2.hash(password);
        }
        if (email && email !== existingUser.email) {
            const emailExists = await prisma.user.findUnique({
                where: { email }
            });
            emailExists && response.badRequest("Email is already in use by another user");
        }
        if (phone && phone!== existingUser.phone) {
            const phoneExists = await prisma.user.findUnique({
                where: { phone }
            });
            phoneExists && response.badRequest("Phone number is already in use by another user");
        }
        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                firstname,
                lastname,
                email,
                password: hashedPassword ?? undefined,
                avatar,
                bio,
                address,
                phone
            },
        });
        return response.success(updatedUser, "User updated successfully");
    } catch (error) {
        console.error("Update user error:", error);
        return response.error(500, "Internal server error");
    }
};