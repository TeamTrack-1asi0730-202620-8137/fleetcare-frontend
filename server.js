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
import express from 'express';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const dbPath = path.join(__dirname, 'server/db.json');
const router = jsonServer.router(dbPath);

const middlewares = jsonServer.defaults({ noCors: true });

const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'server/routes.json'), 'utf-8'));

// Habilitar CORS globalmente y permitir el token CSRF de SAP

server.use(cors({
  origin: 'https://my1000233.us1.test.crm.cloud.sap',
  credentials: true,
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS']
}));

server.use(middlewares);
server.use(jsonServer.rewriter(routes));

// Ruta optimizada para /vehicles que devuelve la estructura { value: [...] } requerida por SAP
server.get('/vehicles', (req, res) => {
  try {
    const dbData = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
    const vehiclesArray = dbData.vehicles || [];
    
    res.json({
      value: vehiclesArray
    });
  } catch (error) {
    res.status(500).json({ error: 'Error leyendo la base de datos' });
  }
});

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('Servidor corriendo en el puerto ' + port);
});


// Update 19.10.2026 - fin
