const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('server/db.json')
const middlewares = jsonServer.defaults()
const routes = require('./server/routes.json')

server.use(middlewares)
server.use(jsonServer.rewriter(routes))
server.use(router)

// Render asigna el puerto automáticamente mediante variables de entorno

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log('JSON Server está corriendo en el puerto ' + port)
})
