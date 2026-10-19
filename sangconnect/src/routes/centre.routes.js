import { listCentres, showCentre } from "../controllers/centre.controller.js";

export async function handleCentreRoutes(req, res) {
  const { pathname } = new URL(req.url, "http://localhost");

  if (pathname === "/api/centres" && req.method === "GET") {
    await listCentres(req, res);
    return true;
  }

  const match = pathname.match(/^\/api\/centres\/(\d+)$/);

  if (match && req.method === "GET") {
    await showCentre(req, res, Number(match[1]));
    return true;
  }

  return false;
}
