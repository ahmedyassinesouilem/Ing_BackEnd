import { getAllCentres, getCentreById } from "../services/centre.service.js";
import { sendJson } from "../utils/http.js";
import { NotFoundError } from "../utils/errors.js";

export async function listCentres(req, res) {
  try {
    const centres = await getAllCentres();
    sendJson(res, 200, { data: centres });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Erreur interne du serveur" });
  }
}

export async function showCentre(req, res, id) {
  try {
    const centre = await getCentreById(id);
    sendJson(res, 200, { data: centre });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return sendJson(res, 404, { error: error.message });
    }
    console.error(error);
    sendJson(res, 500, { error: "Erreur interne du serveur" });
  }
}
