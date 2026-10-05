import http from "node:http";
import { sendJson } from "./utils/http.js";

const port = 3000;

const server = http.createServer((req, res) => {
  console.log("Méthode :", req.method);
  console.log("URL :", req.url);

  
  if (req.url === "/" && req.method === "GET") {
    sendJson(res, 200, {
      message: "Bienvenue dans SangConnect",
      application: "Gestion des dons de sang"
    });

    return;
  }

  if (req.url === "/api/health" && req.method === "GET") {
    sendJson(res, 200, {
      status: "ok",
      service: "SangConnect"
    });

    return;
  }

 if (req.url === "/api/info" && req.method === "GET") {
  sendJson(res, 200, {
    application: "SangConnect",
    version: "1.0.0",
    environment: "development",
    nodeVersion: process.version
  });

  return;
}
if (req.url === "/api/diagnostic") {
  if (req.method !== "GET") {
    sendJson(res, 405, {
      error: "Méthode non autorisée",
      method: req.method,
      allowedMethods: ["GET"]
    });

    return;
  }

  sendJson(res, 200, {
    method: req.method,
    url: req.url,
    headers: req.headers
  });

  return;
}

  
  sendJson(res, 404, {
    error: "Route non trouvée",
    path: req.url,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

server.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});