import http from "node:http";
import { handleCentreRoutes } from "./routes/centre.routes.js";
import { handleDonneurRoutes } from "./routes/donneur.routes.js";
import { sendJson } from "./utils/http.js";

const port = 3000;

const server = http.createServer(async (req, res) => {
  console.log(req.method, req.url);

  try {
    if (await handleCentreRoutes(req, res)) return;
    if (await handleDonneurRoutes(req, res)) return;

    const { pathname } = new URL(req.url, "http://localhost");

    if (pathname === "/" && req.method === "GET") {
      return sendJson(res, 200, {
        message: "Bienvenue dans SangConnect",
        application: "Gestion des dons de sang"
      });
    }

    if (pathname === "/api/health" && req.method === "GET") {
      return sendJson(res, 200, { status: "ok", service: "SangConnect" });
    }

    if (pathname === "/api/info" && req.method === "GET") {
      return sendJson(res, 200, {
        application: "SangConnect",
        version: "1.0.0",
        environment: "development",
        nodeVersion: process.version
      });
    }

    if (pathname === "/api/diagnostic") {
      if (req.method !== "GET") {
        return sendJson(res, 405, {
          error: "Méthode non autorisée",
          method: req.method,
          allowedMethods: ["GET"]
        });
      }
      return sendJson(res, 200, {
        method: req.method,
        url: req.url,
        headers: req.headers
      });
    }

    sendJson(res, 404, {
      error: "Route non trouvée",
      path: req.url,
      method: req.method,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Erreur interne du serveur" });
  }
});

server.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
