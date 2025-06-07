import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import { JWT_ACCESS_TOKEN_SECRET, JWT_REFRESH_TOKEN_SECRET } from '../../../config/config';

export const createRefreshToken = async (payload: any, options: SignOptions) => {
    return jwt.sign(payload, JWT_REFRESH_TOKEN_SECRET, options);
};

export const createAccessToken = (payload: JwtPayload, options: SignOptions) => {
    return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, options);
};

export const verifyToken = async (token: string, secret: 'access' | 'refresh') => {
    return jwt.verify(token, secret === "access" ? JWT_ACCESS_TOKEN_SECRET : JWT_REFRESH_TOKEN_SECRET);
}