import dotenv from "dotenv";
import { Dialect, Sequelize } from 'sequelize';

/* --- .env variables --- */
dotenv.config();
export const SERVER = process.env.SERVER;
export const PORT = process.env.PORT;
export const USER = process.env.USER;
export const PASSWORD = process.env.PASSWORD;
export const DATABASE = process.env.DATABASE;

export const connection = new Sequelize(DATABASE || "database", USER || "admin", PASSWORD, {host: SERVER, dialect: "mysql"});