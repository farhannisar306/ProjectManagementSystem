import { PrismaClient } from "@prisma/client";
import { HTTPResponse } from "../../utils/HTTPResponseHandler";
import { Request, Response } from 'express';
import passport from 'passport';
import { AuthenticatedRequest } from "../../middlewares/isAuthenticated";
import bcrypt from 'bcrypt';
import { createAccessToken, createRefreshToken, decodeToken, verifyToken } from "../../utils/token-manager";
import { setTokenCookie } from "../../utils/cookie-manager";
import { sendActivationMail } from "../../utils/manage-mail-activation";
import { access_token_longevity, frontend_url, node_env, refresh_token_longevity } from "../../../config/config";

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


const refreshAuth = async (req: Request, res: Response) => {
    const response = new HTTPResponse(res);
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return response.badRequest("Refresh token is required");
    } else {
        try {
            verifyToken(refreshToken, 'refresh', (error, decodedToken) => {
                if (error) {
                    return response.badRequest("Invalid refresh token");
                } else {
                    // Create a new access token
                    const accessToken = createAccessToken({
                        id: (decodedToken as { id: string })?.id,
                        email: (decodedToken as { email: string })?.email,
                        role: (decodedToken as { role: string })?.role
                    }, {
                        algorithm: 'HS256',
                        expiresIn: access_token_longevity
                    });
                    // Set the new access token in the response
                    setTokenCookie("accessToken", {
                        httpOnly: false,
                        secure: true,
                        sameSite: 'strict'
                    }, res, accessToken, access_token_longevity as string);
                    response.success({
                        accessToken: accessToken,
                    }, `Access token refreshed successfully at: ${new Date(new Date().toISOString()).toLocaleString('en-US', {
                        timeZone: 'Asia/Dhaka',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                        hour12: true,
                    })}`);
                }
            });
        } catch (error) {
            return response.internalServerError("Internal server error", {
                error: error,
            });
        }
    }
}


const resendActivationMail = async (req: Request, res: Response) => {
    const response = new HTTPResponse(res);
    const { expiredToken } = req.params;
    if (!expiredToken) {
        return response.badRequest("token is required");
    } else {
        try {
            decodeToken(expiredToken).then((decodedToken) => {
                sendActivationMail((decodedToken as { email: string })?.email)
                response.send(201, "Check your mail inbox for the new activation link", decodedToken)
            });
        } catch (error) {
            return response.internalServerError("Internal server error", {
                error: error,
            });
        }
    }
}

const verifyEmailToken = async (req: Request, res: Response) => {
    const response = new HTTPResponse(res);
    const { token } = req.params;
    if (!token) {
        return response.badRequest("Token is required");
    } else {
        try {
            verifyToken(token, 'mail', (error, decodedToken) => {
                if (error) {
                    return response.badRequest("Invalid token");
                } else {
                    prisma.user.update({
                        where: {
                            email: (decodedToken as { email: string })?.email,
                            isVerified: false,
                        },
                        data: {
                            isVerified: true,
                        },
                    }).then((updatedUser) => {
                        response.success(updatedUser, "Email verified successfully");
                    }).catch((error) => {
                        return response.internalServerError("Internal server error", {
                            error: error,
                        });
                    });
                }
            });
        } catch (error) {
            return response.internalServerError("Internal server error", {
                error: error,
            });
        }
    }
}

const googleAuthCallback = async (req: Request, res: Response) => {
    const response = new HTTPResponse(res);

    passport.authenticate('google', {
        failureRedirect: `${frontend_url}/login`,
        failureFlash: true
    }, (err: unknown, user:{
        id: string,
        email: string,
        role: string
    }) => {
        if (err) {
            return response.internalServerError("Internal server error", {
                error: err,
            });
        } else {
            createRefreshToken({
                id: user.id,
                email: user.email,
                role: user.role
            }, {
                algorithm: 'HS256',
                expiresIn: refresh_token_longevity // Refresh token for 7 days
            }).then((refreshToken) => {
                //assign the refresh token to the cookie
                setTokenCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
                }, res, refreshToken, '30d');

                //create the access token using JWT
                const accessToken = createAccessToken({
                    id: user.id,
                    email: user.email,
                    role: user.role
                }, {
                    algorithm: 'HS256',
                    expiresIn: refresh_token_longevity
                })

                //assign the access token to the cookie
                setTokenCookie("accessToken", {
                    httpOnly: false,
                    secure: node_env === "production",
                    sameSite: 'strict'
                }, res, accessToken, '5m');
                return res.redirect(`${frontend_url}`)
            })
            
        }

    })(req, res);
};






const loginUser = async (req: Request, res: Response) => {
    const response = new HTTPResponse(res);
    const { email, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
                isVerified: true,
            },
        });

        if (!user) {
            return response.notFound("User not found or the account isn't verified yet");
        }

        const passwordMatch = await bcrypt.compare(password, user.password as string);

        if (!passwordMatch) {
            return response.badRequest("Invalid credentials");
        } else {
            //login successful
            // Create a refresh token
            createRefreshToken({
                id: user.id,
                email: user.email,
                role: user.role
            }, {
                algorithm: 'HS256',
                expiresIn: refresh_token_longevity // Refresh token for 7 days
            }).then((refreshToken) => {
                //assign the refresh token to the cookie
                setTokenCookie("refreshToken", {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict'
                }, res, refreshToken, '30d');

                //create the access token using JWT
                const accessToken = createAccessToken({
                    id: user.id,
                    email: user.email,
                    role: user.role
                }, {
                    algorithm: 'HS256',
                    expiresIn: refresh_token_longevity
                })

                //assign the access token to the cookie
                setTokenCookie("accessToken", {
                    httpOnly: false,
                    secure: node_env === "production",
                    sameSite: 'strict'
                }, res, accessToken, '5m');
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


export const authController = {
    getAuthenticatedUser,
    verifyEmailToken,
    loginUser,
    refreshAuth,
    resendActivationMail,
    googleAuthCallback
}