import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const base_url = process.env.BASE_URL;
export const node_env = process.env.NODE_ENV;
export const frontend_url = process.env.FRONTEND_URL;
export const port = process.env.PORT;
export const hash_saltRounds = 10;
export const minimum_password_length = 6;
//these 2 are unused for now
// export const avatar_file_size_max = 1 * 1024**2;
// export const avatar_file_allowed_types = ['image/png', 'image/jpeg']
export const JWT_REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_TOKEN_SECRET || 'refresh_token_secret';
export const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET || 'access_token_secret';
