import * as donneurService from "../services/donneur.service.js";
import { HttpError } from "../errors/HttpError.js";

export function getDonneurs(req, res) {
    res.json(donneurService.getAll(req.query.groupeSanguin));
}

export function getDonneurById(req, res) {
    const donneur = donneurService.getById(req.params.id);
    if (!donneur) throw new HttpError(404, "Donneur introuvable");
    res.json(donneur);
}

export function createDonneur(req, res) {
    res.status(201).json(donneurService.create(req.body));
}

export function updateDonneur(req, res) {
    const donneur = donneurService.update(req.params.id, req.body);
    if (!donneur) throw new HttpError(404, "Donneur introuvable");
    res.json(donneur);
}

export function deleteDonneur(req, res) {
    if (!donneurService.remove(req.params.id)) {
        throw new HttpError(404, "Donneur introuvable");
    }
    res.status(204).send();
}