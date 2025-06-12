import { NextFunction, Request, Response } from "express";
import catchAsync from "./CatchAsyncError";
import ErrorHandler from "../utils/ErrorHandler";
import { verifyToken } from "../utils/token-manager";
import { UNAUTHORIZED } from "../utils/status-codes/HTTPStatuses";


export interface AuthenticatedRequest extends Request {
    id?: string;
    file?: any;
    query: any;
    body: any;
    params: any;
    cookies: any;
    headers: any;
}

export const isAuthenticate = catchAsync(
    async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return next(new ErrorHandler("Login to access", UNAUTHORIZED));
        }

        try {
            const decoded = await verifyToken(token, "access");
            if (!decoded) {
                return next(new ErrorHandler("Failed to load user", UNAUTHORIZED));
            }
            if (typeof decoded !== 'string' && 'id' in decoded) {
                req.id = decoded.id;
            } else {
                return next(new ErrorHandler("Invalid token payload", UNAUTHORIZED));
            }
            next();
        } catch (error) {
            return next(new ErrorHandler("Token verification failed", UNAUTHORIZED));
        }
    }
);
