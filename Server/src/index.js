'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const http_1 = require('http')
const server = (0, http_1.createServer)((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello, This is typescript + node\n')
})
const PORT = 3000
server.listen(PORT, () => {
  console.log(`SERVER LISTENING ON PORT ${PORT}`)
})
