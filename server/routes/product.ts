import express from "express";

import { getProducts } from "../controller/product";

const router = express.Router();

router.get("/get-all", getProducts);

export default router;