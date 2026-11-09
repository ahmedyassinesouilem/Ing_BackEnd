import { Router } from "express";
import { validate } from "../middlewares/validate.js";
import {
    donneurSchema,
    updateDonneurSchema,
    idSchema,
    donneurQuerySchema
} from "../validators/donneur.validator.js";
import {
    getDonneurs, getDonneurById, createDonneur, updateDonneur, deleteDonneur
} from "../controllers/donneur.controller.js";

const router = Router();

router.get("/", validate(donneurQuerySchema, "query"), getDonneurs);
router.get("/:id", validate(idSchema, "params"), getDonneurById);
router.post("/", validate(donneurSchema, "body"), createDonneur);
router.put("/:id", validate(idSchema, "params"), validate(donneurSchema, "body"), updateDonneur);
router.patch("/:id", validate(idSchema, "params"), validate(updateDonneurSchema, "body"), updateDonneur);
router.delete("/:id", validate(idSchema, "params"), deleteDonneur);

export default router;