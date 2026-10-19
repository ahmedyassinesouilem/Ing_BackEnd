# SangConnect — Gestion des dons de sang

API Node.js (module `node:http` natif, ES modules) organisée en couches.

## Lancer

```
npm start
```

Erreur simulée du repository : `SIMULATE_DB_ERROR=1 npm start`

## Architecture

```
Client HTTP → Routes → Controllers → Services → Repositories → Données
```

| Couche | Fichier (donneurs) | Responsabilité |
|---|---|---|
| Routes | `routes/donneur.routes.js` | Identifier l'URL et la méthode, extraire `:id` et `?ville=` |
| Controller | `controllers/donneur.controller.js` | Dialoguer en HTTP : appeler le service, choisir le code (200/400/404/500) |
| Service | `services/donneur.service.js` | Règles métier : donneur introuvable, ville obligatoire |
| Repository | `repositories/donneur.repository.js` | Accès aux données (tableau fictif), ne connaît pas HTTP |
| Utils | `utils/` | `sendJson`, erreurs métier (`NotFoundError`, `ValidationError`) |

La même structure est appliquée aux centres (`centre.*`).

### Gestion des erreurs

- Le service lève `NotFoundError` ou `ValidationError` (aucune notion de HTTP).
- Le controller les convertit : `NotFoundError` → 404, `ValidationError` → 400, autre erreur → 500.
- Les erreurs techniques sont journalisées côté serveur ; le client reçoit un message générique.

### Choix de conception

- La recherche par ville est dans le **repository** (accès aux données) ; la validation « ville obligatoire » est dans le **service** (règle métier).
- `?ville=` (présent mais vide) → 400 ; paramètre absent → liste complète.
- Un changement de base (ex. PostgreSQL) ne touche que les repositories.

## Endpoints

| Méthode | URL | Résultat |
|---|---|---|
| GET | `/api/donneurs` | Liste des donneurs |
| GET | `/api/donneurs?ville=Tunis` | Donneurs d'une ville (insensible à la casse) |
| GET | `/api/donneurs/:id` | Un donneur, 404 si inexistant |
| GET | `/api/centres`, `/api/centres/:id` | Centres |

## Tests curl

```
curl -i http://localhost:3000/api/donneurs
curl -i http://localhost:3000/api/donneurs/1
curl -i http://localhost:3000/api/donneurs/999          # 404
curl -i "http://localhost:3000/api/donneurs?ville=Tunis"
curl -i "http://localhost:3000/api/donneurs?ville="     # 400
```

Erreur simulée : `SIMULATE_DB_ERROR=1 npm start`, puis `curl -i http://localhost:3000/api/donneurs` → 500.

Un script est fourni : `sh tests.sh`.
