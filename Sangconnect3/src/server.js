import express from "express";

const app = express();
const PORT = 3000;
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
        nom: "Mansouri",
        prenom: "Amine",
        groupeSanguin: "B+"
    }
];
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Bienvenue dans SangConnect");
});


app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        service: "SangConnect"
    });
});
app.get("/api/donneurs", (req, res) => {

    const groupe = req.query.groupeSanguin;

    if (!groupe) {
        return res.json(donneurs);
    }

    const resultat = donneurs.filter(
        donneur => donneur.groupeSanguin === groupe
    );

    res.json(resultat);
});
app.patch("/api/donneurs/:id", (req, res) => {

    const id = Number(req.params.id);

    const donneur = donneurs.find(
        donneur => donneur.id === id
    );

    if (!donneur) {
        return res.status(404).json({
            message: "Donneur introuvable"
        });
    }

    if (req.body.nom !== undefined) {
        donneur.nom = req.body.nom;
    }

    if (req.body.prenom !== undefined) {
        donneur.prenom = req.body.prenom;
    }

    if (req.body.groupeSanguin !== undefined) {
        donneur.groupeSanguin = req.body.groupeSanguin;
    }

    res.json(donneur);
});

app.post("/api/donneurs", (req, res) => {

    const donneur = {
        id: donneurs.length + 1,
        nom: req.body.nom,
        prenom: req.body.prenom,
        groupeSanguin: req.body.groupeSanguin
    };

    donneurs.push(donneur);

    res.status(201).json(donneur);
});
app.delete("/api/donneurs/:id", (req, res) => {

    const id = Number(req.params.id);

    const index = donneurs.findIndex(
        donneur => donneur.id === id
    );

    if (index === -1) {
        return res.status(404).json({
            message: "Donneur introuvable"
        });
    }

    donneurs.splice(index, 1);

    res.status(204).send();
});
app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
