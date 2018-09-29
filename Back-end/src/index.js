require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

// TODO - Middleware for JWT + hashing

server.start({
  cors: {
    credentials: true, 
    origin: process.env.FRONTEND_URL
  }
},
  info => console.log(`Server is running on http://localhost:${info.port}`) 
)