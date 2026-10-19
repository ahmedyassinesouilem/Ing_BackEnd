const centres = [
  { id: 1, nom: "Centre de transfusion de Tunis", ville: "Tunis" },
  { id: 2, nom: "Centre régional de Sousse", ville: "Sousse" },
  { id: 3, nom: "Centre régional de Sfax", ville: "Sfax" }
];

export async function findAll() {
  return centres;
}

export async function findById(id) {
  return centres.find(centre => centre.id === id);
}

export async function searchByCity(city) {
  return centres.filter(
    centre => centre.ville.toLowerCase() === city.toLowerCase()
  );
}
