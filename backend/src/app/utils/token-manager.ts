import jwt, {
    JwtPayload,
    SignOptions,
    VerifyCallback,
    DecodeOptions,
} from 'jsonwebtoken';

import {
    jwt_access_token_secret,
    jwt_refresh_token_secret,
    jwt_mail_token_secret,
} from '../../config/config';

/**
 * Creates a JWT token for email activation purposes.
 *
 * @param payload - The data to encode in the token (e.g., user email)
 * @param options - Signing options such as expiration and algorithm
 * @returns A Promise that resolves to a signed JWT string
 */
export const createMailActivationToken = async (
    payload: any,
    options: SignOptions
): Promise<string> => {
    return jwt.sign(payload, jwt_mail_token_secret, options);
};

/**
 * Creates a JWT refresh token.
 *
 * @param payload - The data to encode in the token (e.g., user ID)
 * @param options - Signing options such as expiration and algorithm
 * @returns A Promise that resolves to a signed JWT string
 */
export const createRefreshToken = async (
    payload: any,
    options: SignOptions
): Promise<string> => {
    return jwt.sign(payload, jwt_refresh_token_secret, options);
};

/**
 * Creates a JWT access token.
 *
 * @param payload - The data to encode in the token (e.g., user ID)
 * @param options - Signing options such as expiration and algorithm
 * @returns A signed JWT string
 */
export const createAccessToken = (
    payload: any,
    options: SignOptions
): string => {
    return jwt.sign(payload, jwt_access_token_secret, options);
};

/**
 * Verifies a JWT token using the appropriate secret key.
 *
 * @param token - The JWT token to verify
 * @param secret - The token type to verify ('access' | 'refresh' | 'mail')
 * @param callback - Optional callback for async-style handling
 * @returns The decoded payload if verification succeeds, or an error if it fails
 */
export const verifyToken = async (
    token: string,
    secret: 'access' | 'refresh' | 'mail',
    callback?: VerifyCallback
): Promise<JwtPayload | string | void> => {
    const secretKey =
        secret === 'access'
            ? process.env.JWT_ACCESS_TOKEN_SECRET!
            : secret === 'refresh'
                ? process.env.JWT_REFRESH_TOKEN_SECRET!
                : process.env.JWT_MAIL_TOKEN_SECRET!;

    if (callback) {
        return jwt.verify(token, secretKey, callback);
    } else {
        return jwt.verify(token, secretKey);
    }
};


/**
 * Decodes a JWT token **without verifying** its signature or expiration.
 * Useful when you want to extract payload from expired or tampered tokens.
 *
 * @param token - The JWT token string to decode
 * @param options - Optional decode options (e.g., { complete: true } to get header + payload)
 * @returns Decoded payload object, string, or null if decoding fails
 */

export const decodeToken = async (token: string,options?: DecodeOptions)=> {
    return jwt.decode(token, options || {})
};
