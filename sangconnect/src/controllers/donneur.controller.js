import {
  getAllDonneurs,
  getDonneurById,
  searchDonneursByCity
} from "../services/donneur.service.js";
import { sendJson } from "../utils/http.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";

function handleError(res, error) {
  if (error instanceof NotFoundError) {
    return sendJson(res, 404, { error: error.message });
  }

  if (error instanceof ValidationError) {
    return sendJson(res, 400, { error: error.message });
  }

  // Erreur technique : journalisée côté serveur, message générique au client
  console.error(error);
  return sendJson(res, 500, { error: "Erreur interne du serveur" });
}

export async function listDonneurs(req, res, ville) {
  try {
    // ville === null : paramètre absent ; "" : paramètre présent mais vide
    const donneurs = ville === null
      ? await getAllDonneurs()
      : await searchDonneursByCity(ville);

    sendJson(res, 200, { data: donneurs });
  } catch (error) {
    handleError(res, error);
  }
}

export async function showDonneur(req, res, id) {
  try {
    const donneur = await getDonneurById(id);
    sendJson(res, 200, { data: donneur });
  } catch (error) {
    handleError(res, error);
  }
}
