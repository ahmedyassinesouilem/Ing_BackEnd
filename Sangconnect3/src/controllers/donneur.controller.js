import * as donneurService from "../services/donneur.service.js";


export function getAll(req, res) {
    const donneurs = donneurService.getAll();

    res.json(donneurs);
}


export function getById(req, res) {
    const id = Number(req.params.id);

    const donneur = donneurService.getById(id);

    if (!donneur) {
        return res.status(404).json({
            message: "Donneur introuvable"
        });
    }

    res.json(donneur);
}


export function DeleteById(req, res) {
    const id = Number(req.params.id);

    const donneur = donneurService.DeleteById(id);

    if (!donneur) {
        return res.status(404).json({
            message: "Donneur introuvable"
        });
    }

    res.json({
        message: "Donneur supprimé avec succès",
        donneur: donneur
    });
}