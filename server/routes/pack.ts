import express from "express";

import { getPacks } from "../controller/pack";

const router = express.Router();

router.get("/all", getPacks);

export default router;