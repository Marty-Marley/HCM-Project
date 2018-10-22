const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')

require('dotenv').config({ path: 'variables.env' })
const createServer = require('./createServer')
const db = require('./db')

const server = createServer()

/**
 * JWT middleware for authentication
 * Parse the cookie for easier use
 * If a token exists verify the userid and attach to the current request
 */
server.express.use(cookieParser())

server.express.use((request, response, next) => {
  const { token } = request.cookies
  if(token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    request.userId = userId
  }
  next()
})

server.start({
  cors: {
    credentials: true, 
    origin: process.env.FRONTEND_URL
  }
},
  info => console.log(`Server is running on http://localhost:${info.port}`) 
)