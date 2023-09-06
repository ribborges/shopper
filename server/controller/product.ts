import { Request, Response } from "express";

import Product from "../models/product";

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.findAll();

        res.status(200).json(products);
    } catch (error: any) {
        res.status(404).json({
            error: "404",
            message: error.message
        });
    }
};