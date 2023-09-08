import { Request, Response } from "express";

import Pack from "../models/pack";

export const getPacks = async (req: Request, res: Response) => {
    try {
        const packs = await Pack.findAll();
        
        res.status(200).json(packs);
    } catch (error: any) {
        res.status(404).json({
            error: "404",
            message: error.message
        });
    }
}