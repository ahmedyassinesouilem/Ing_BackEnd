import { z } from "zod";

const groupes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const donneurSchema = z.object({
    nom: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    prenom: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
    groupeSanguin: z.enum(groupes, "Groupe sanguin invalide")
});

export const updateDonneurSchema = donneurSchema
    .partial()
    .refine(d => Object.keys(d).length > 0, "Au moins un champ est requis");

export const idSchema = z.object({
    id: z.coerce.number().int().positive()
});

export const donneurQuerySchema = z.object({
    groupeSanguin: z.enum(groupes).optional()
});