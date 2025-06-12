import * as dotenv from "dotenv";
import { SignOptions } from 'jsonwebtoken';
import path from "path";
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const base_url = process.env.BASE_URL;
export const api_version = process.env.API_VERSION;
export const node_env = process.env.NODE_ENV;
export const frontend_port = process.env.FRONTEND_PORT;
export const frontend_url = process.env.BASE_URL+":"+process.env.FRONTEND_PORT;
export const backend_port = process.env.BACKEND_PORT;


export const database_provider = process.env.DATABASE_PROVIDER;
export const database_host = process.env.DATABASE_HOST;
export const database_port = process.env.DATABASE_PORT;
export const database_username = process.env.DATABASE_USERNAME;
export const database_password = process.env.DATABASE_PASSWORD;
export const database_name = process.env.DATABASE_NAME;

//unused for now
export const database_connection_string = `${database_provider}://${database_username}:${database_password}@${database_host}:${database_port}/${database_name}?charset=${process.env.DATABASE_CHARSET}`;



export const hash_saltRounds = 10;
export const minimum_password_length = 6;
// these 2 are unused for now
// export const avatar_file_size_max = 1 * 1024**2;
// export const avatar_file_allowed_types = ['image/png', 'image/jpeg']
export const jwt_refresh_token_secret = process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh_token_secret';
export const jwt_access_token_secret = process.env.JWT_ACCESS_TOKEN_SECRET || 'access_token_secret';
export const jwt_mail_token_secret = process.env.JWT_MAIL_TOKEN_SECRET || 'access_token_secret';

export const access_token_longevity = process.env.ACCESS_TOKEN_LONGEVITY as SignOptions['expiresIn'];
export const refresh_token_longevity = process.env.REFRESH_TOKEN_LONGEVITY as SignOptions['expiresIn'];
export const mail_token_longevity = process.env.MAIL_TOKEN_LONGEVITY as SignOptions['expiresIn'];

