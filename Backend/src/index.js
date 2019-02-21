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

/**
 * If there is a JWT within the cookie,
 * verify it + put the userID on top of the request.
 */
server.express.use((request, response, next) => {
  const { token } = request.cookies
  if(token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET)
    request.userId = userId
  }
  next()
})

/**
 * If a user is logged in, query their information for permissions.
 */
server.express.use(async (request, response, next) => {
  if(!request.userId) return next()
  const user = await db.query.user({ where: { id: request.userId } }, '{ id, permissions, firstName, email }')
  request.user = user
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