import {
  findAll,
  findById,
  searchByCity
} from "../repositories/donneur.repository.js";
import { NotFoundError, ValidationError } from "../utils/errors.js";

export async function getAllDonneurs() {
  return await findAll();
}

export async function getDonneurById(id) {
  const donneur = await findById(id);

  if (!donneur) {
    throw new NotFoundError("Donneur introuvable");
  }

  return donneur;
}

export async function searchDonneursByCity(city) {
  if (!city || city.trim() === "") {
    throw new ValidationError("La ville est obligatoire");
  }

  return await searchByCity(city.trim());
}
