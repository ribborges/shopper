import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Dialect, Sequelize } from 'sequelize';
import mysql2 from "mysql2";

import productRoutes from "./routes/product";

import { connection, PORT } from "./config";

/* --- App config --- */
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

/* --- Routes --- */
app.use("/product", productRoutes);

connection.authenticate().then(() => {
    console.log("Success");
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
}).catch((error) => {
    console.log("ERROR: " + error);
});

