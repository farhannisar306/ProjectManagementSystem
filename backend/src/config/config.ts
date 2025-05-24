import * as dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const base_url = process.env.BASE_URL;
export const port = process.env.PORT;

