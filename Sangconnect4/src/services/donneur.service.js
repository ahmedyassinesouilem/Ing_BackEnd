const donneurs = [
    {
        id: 1,
        nom: "Ben Ali",
        prenom: "Ahmed",
        groupeSanguin: "A+"
    },
    {
        id: 2,
        nom: "Trabelsi",
        prenom: "Sami",
        groupeSanguin: "O+"
    },
    {
        id: 3,
        nom: "Trabelsi",
        prenom: "Sami",
        groupeSanguin: "O+"
    }
];

// Récupérer tous les donneurs
export function getAll() {
    return donneurs;
}

// Récupérer un donneur par son ID
export function getById(id) {
    return donneurs.find(
        donneur => donneur.id === Number(id)
    );
}


export function DeleteById(id) {
    const index = donneurs.findIndex(
        donneur => donneur.id === Number(id)
    );

    if (index === -1) {
        return null;
    }

    return donneurs.splice(index, 1)[0];
}