import { CookieOptions, Response } from 'express';
import ErrorHandler from './ErrorHandler';
import { INTERNAL_SERVER_ERROR } from './status-codes/HTTPStatuses';
// Helper function to parse time strings like '15m', '30s', '2h', '1d'
const parseDuration = (duration: string): number => {
    const match = duration.match(/^(\d+)([smhd])$/);
    if (!match) throw new ErrorHandler('Invalid maxAge format. Use "30s"/"15m"/"30s"/"1h", etc.', INTERNAL_SERVER_ERROR);

    const [_, value, unit] = match;
    const time = parseInt(value, 10);

    const unitToMs: Record<string, number> = {
        s: 1000,
        m: 60 * 1000,
        h: 3600 * 1000,
        d: 24 * 3600 * 1000,
    };
    return time * unitToMs[unit];
};

export const setTokenCookie = (tokenName:string, config:CookieOptions, res: Response, token: string, maxAge: string) => {
    try {
        res.cookie(tokenName, token, {
            httpOnly: config.httpOnly,
            secure: config.secure,
            sameSite: config.sameSite,
            maxAge: parseDuration(maxAge),
        });
    } catch (error) {
        console.log(error)
    }
};

export const clearTokenCookie = (tokenType:string, res: Response) => {
    res.clearCookie(tokenType, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });
};