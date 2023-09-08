import express from "express";

import { getProducts, updateProducts, validateProducts } from "../controller/product";

const router = express.Router();

router.get("/all", getProducts);
router.post("/validate", validateProducts);
router.post("/update", updateProducts);

export default router;