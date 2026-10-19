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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'server/db.json'));
const middlewares = jsonServer.defaults();

// Leer el archivo de rutas dinámicamente
const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'server/routes.json'), 'utf-8'));

server.use(middlewares);

// Middleware personalizado para habilitar CORS explícitamente en todas las respuestas
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
});

server.use(jsonServer.rewriter(routes));

// Interceptar específicamente la respuesta de /vehicles para adaptarla a la estructura que exige SAP Service Cloud V2
server.use((req, res, next) => {
  if (req.method === 'GET' && req.path === '/vehicles') {
    const originalJson = res.json.bind(res);
    res.json = (data) => {
      // Si la data es un arreglo plano, lo envolvemos en el objeto { value: [...] } que requiere SAP
      if (Array.isArray(data)) {
        return originalJson({ value: data });
      }
      return originalJson(data);
    };
  }
  next();
});

server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('JSON Server está corriendo en el puerto ' + port);
});

// Update 19.10.2026 - fin
