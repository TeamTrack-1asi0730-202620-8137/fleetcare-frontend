// import jsonServer from 'json-server';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import fs from 'fs';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const server = jsonServer.create();
// const router = jsonServer.router(path.join(__dirname, 'server/db.json'));
// const middlewares = jsonServer.defaults();

// // Leer el archivo de rutas dinámicamente usando el sistema de módulos
// const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'server/routes.json'), 'utf-8'));

// server.use(middlewares);
// server.use(jsonServer.rewriter(routes));
// server.use(router);

// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//  console.log('JSON Server está corriendo en el puerto ' + port);
// });


// Update 19.10.2026 - inicio

import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const dbPath = path.join(__dirname, 'server/db.json');
const router = jsonServer.router(dbPath);

// 1. Configurar CORS de forma estricta y global en Express
server.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-csrf-token', 'authorization']
}));

// Permitir manejar JSON
server.use(jsonServer.bodyParser);

// 2. Ruta explícita y prioritaria para /vehicles (atendida antes que cualquier middleware de json-server)
server.get('/vehicles', (req, res) => {
  try {
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const vehiclesArray = dbData.vehicles || [];
    
    // Devolvemos el formato exacto requerido por SAP
    return res.json({
      value: vehiclesArray
    });
  } catch (error) {
    return res.status(500).json({ error: 'Error leyendo la base de datos' });
  }
});

// Middlewares por defecto de json-server para el resto de rutas (si los necesitas)
server.use(jsonServer.defaults());

const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'server/routes.json'), 'utf-8'));
server.use(jsonServer.rewriter(routes));
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Servidor corriendo limpio en el puerto ' + port);
});

// Update 19.10.2026 - fin
