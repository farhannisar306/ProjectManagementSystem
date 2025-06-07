import { PrismaClient } from "@prisma/client";
import { HTTPResponse } from "../../utils/HTTPResponseHandler";
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { hash_saltRounds } from "../../../config/config";
import { createAccessToken, createRefreshToken, verifyToken } from "../../utils/token/TokenManager";
import { setTokenCookie } from "../../utils/cookie-services/CookieManager";
import { AuthenticatedRequest } from "../../middlewares/isAuthenticated";
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

const getAuthenticatedUser = async (req: AuthenticatedRequest, res: Response) => {
    const response = new HTTPResponse(res);
    try {
        const foundUser = await prisma.user.findUnique({
            where: {
                id: req.id,
            },
        })
        foundUser ? response.success(foundUser, "User found") : response.notFound("User not found");
    } catch (error) {
        return response.internalServerError("Internal server error", {
            error: error,
        });
    }
}

const loginUser = async (req: Request, res: Response) => {
    const response = new HTTPResponse(res);
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            return response.notFound("User not found");
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return response.badRequest("Invalid credentials");
        } else {
            // Create a refresh token
            createRefreshToken({
                id: user.id,
                email: user.email,
                role: user.role
            }, {
                algorithm: 'HS256',
                expiresIn: '30d' // Refresh token for 30 days
            }).then((refreshToken) => {
                //assign the refresh token to the cookie
                setTokenCookie("refreshToken", res, refreshToken, '60d');

                //create the access token using JWT
                const accessToken = createAccessToken({
                    id: user.id,
                    email: user.email,
                    role: user.role
                }, {
                    algorithm: 'HS256',
                    expiresIn: '7d'
                })

                //assign the access token to the cookie
                setTokenCookie("accessToken", res, accessToken, '7d');
                return response.success({
                    user: user,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }, "User logged in successfully");
            })
        }
    } catch (error) {
        return response.internalServerError("Internal server error");
    }
}

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
            },
        }).then((created_user) => {
            createRefreshToken({
                id: created_user.id,
                email,
                role: created_user.role
            }, {
                algorithm: 'HS256',
                expiresIn: '30d' // Refresh token for 30 days
            }).then((refreshToken) => {
                //assign the refresh token to the cookie
                setTokenCookie("refreshToken", res, refreshToken, '60d');

                //create the access token using JWT
                const accessToken = createAccessToken({
                    id: created_user.id,
                    email,
                    role: created_user.role
                }, {
                    algorithm: 'HS256',
                    expiresIn: '7d'
                })
                //assign the access token to the cookie
                setTokenCookie("accessToken", res, accessToken, '7d');
                return response.success({
                    latestCreatedUser: created_user,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                }, "User created successfully");
            })
        })
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
    getAuthenticatedUser,
    createUser,
    deleteUser,
    updateUser,
    loginUser
};