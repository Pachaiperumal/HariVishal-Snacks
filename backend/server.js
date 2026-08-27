import { createServer } from 'node:http'

const port = process.env.PORT || 4000

const server = createServer((request, response) => {
  response.setHeader('Content-Type', 'application/json')
  response.setHeader('Access-Control-Allow-Origin', '*')

  if (request.url === '/api/health') {
    response.writeHead(200)
    response.end(JSON.stringify({ status: 'ok', service: 'hari-vishal-snacks-api' }))
    return
  }

  response.writeHead(404)
  response.end(JSON.stringify({ error: 'Route not found' }))
})

server.listen(port, () => {
  console.log(`Backend API running at http://localhost:${port}`)
})
