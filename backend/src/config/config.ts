import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const base_url = process.env.BASE_URL;
export const node_env = process.env.NODE_ENV;
export const frontend_url = process.env.FRONTEND_URL;
export const port = process.env.PORT;
export const hash_saltRounds = 10
