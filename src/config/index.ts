import dotEnv from "dotenv";
dotEnv.config();

export const PORT: string | undefined = process.env.PORT;
export const MONGO_URI: string | undefined = process.env.MONGO_URI || '';
