const donneurs = [
  { id: 1, nom: "Ben Ali", prenom: "Ahmed", groupeSanguin: "O+", ville: "Tunis" },
  { id: 2, nom: "Trabelsi", prenom: "Sarra", groupeSanguin: "A+", ville: "Sousse" },
  { id: 3, nom: "Gharbi", prenom: "Karim", groupeSanguin: "B-", ville: "Sfax" },
  { id: 4, nom: "Mejri", prenom: "Leila", groupeSanguin: "AB+", ville: "Tunis" },
  { id: 5, nom: "Jaziri", prenom: "Omar", groupeSanguin: "O-", ville: "Sousse" }
];

// Erreur simulée : lancer le serveur avec SIMULATE_DB_ERROR=1
function checkDatabase() {
  if (process.env.SIMULATE_DB_ERROR === "1") {
    throw new Error("Base de données indisponible");
  }
}

export async function findAll() {
  checkDatabase();
  return donneurs;
}

export async function findById(id) {
  checkDatabase();
  return donneurs.find(donneur => donneur.id === id);
}

export async function searchByCity(city) {
  checkDatabase();
  return donneurs.filter(
    donneur => donneur.ville.toLowerCase() === city.toLowerCase()
  );
}
