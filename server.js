import jsonServer from 'json-server';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, 'server/db.json'));
const middlewares = jsonServer.defaults();

// Leer el archivo de rutas dinámicamente usando el sistema de módulos
const routes = JSON.parse(fs.readFileSync(path.join(__dirname, 'server/routes.json'), 'utf-8'));

server.use(middlewares);
server.use(jsonServer.rewriter(routes));
server.use(router);

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log('JSON Server está corriendo en el puerto ' + port);
});
