import dotenv from "dotenv";
dotenv.config();
export const tokenSecret = process.env.SECRET_TOKEN;
export const apiVersion = process.env.VERSION;
export const port = process.env.PORT || 5555;