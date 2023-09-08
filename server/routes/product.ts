import express from "express";

import { getProducts, updateProducts } from "../controller/product";

const router = express.Router();

router.get("/all", getProducts);

router.post("/update", updateProducts);

export default router;