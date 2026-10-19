import express from "express";

import {
    getAll,
    getById,
    DeleteById
} from "../controllers/donneur.controller.js";

const router = express.Router();

router.get("/", getAll);

router.get("/:id", getById);
router.delete("/:id", DeleteById);

export default router;