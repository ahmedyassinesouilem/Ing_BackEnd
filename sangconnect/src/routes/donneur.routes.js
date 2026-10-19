import { listDonneurs, showDonneur } from "../controllers/donneur.controller.js";

export async function handleDonneurRoutes(req, res) {
  const { pathname, searchParams } = new URL(req.url, "http://localhost");

  if (pathname === "/api/donneurs" && req.method === "GET") {
    const ville = searchParams.has("ville") ? searchParams.get("ville") : null;
    await listDonneurs(req, res, ville);
    return true;
  }

  const match = pathname.match(/^\/api\/donneurs\/(\d+)$/);

  if (match && req.method === "GET") {
    await showDonneur(req, res, Number(match[1]));
    return true;
  }

  return false;
}
