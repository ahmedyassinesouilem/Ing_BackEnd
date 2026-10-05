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
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("API opérationnelle");
    return;
  }


  if (req.url === "/api/info" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("SangConnect - API de gestion des dons de sang");
    return;
  }

 
  res.writeHead(200, {
  "Content-Type": "application/json"
});
const message = {message : "Route non trouvée"};

  res.end(JSON.stringify(message));
});

server.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
