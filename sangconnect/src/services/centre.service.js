import {
  findAll,
  findById,
  searchByCity
} from "../repositories/centre.repository.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";

export async function getAllCentres() {
  return await findAll();
}

export async function getCentreById(id) {
  const centre = await findById(id);

  if (!centre) {
    throw new NotFoundError("Centre introuvable");
  }

  return centre;
}

export async function searchCentresByCity(city) {
  if (!city || city.trim() === "") {
    throw new ValidationError("La ville est obligatoire");
  }

  return await searchByCity(city.trim());
}
