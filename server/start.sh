#!/usr/bin/env sh
npx json-server --watch server/db.json --routes server/routes.json --port 3000
