#!/bin/sh
# Lancer le serveur (npm start) puis : sh tests.sh
B=http://localhost:3000
curl -i $B/api/donneurs
curl -i $B/api/donneurs/1
curl -i $B/api/donneurs/999
curl -i "$B/api/donneurs?ville=Tunis"
curl -i "$B/api/donneurs?ville="
curl -i $B/api/centres
curl -i $B/api/centres/999
# Erreur simulée du repository : SIMULATE_DB_ERROR=1 npm start, puis
# curl -i $B/api/donneurs   -> 500
