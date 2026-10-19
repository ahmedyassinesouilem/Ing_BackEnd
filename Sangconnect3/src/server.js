import express from "express";

import donneurRoutes from "./routes/donneur.routes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "Bienvenue dans l'API SangConnect"
    });
});

app.use("/api/donneurs", donneurRoutes);

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});