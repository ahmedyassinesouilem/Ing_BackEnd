import { z } from "zod";

const schema = z.object({
    nom: z.string(),
    prenom: z.string()
});

const donneur = {
    nom: "Ben Ali",
    prenom: "Ahmed"
};

const resultat = schema.safeParse(donneur);

console.log(resultat);