/**
 * ENSURE TO POINT TO THIS CUSTOM SERVER
 * NPM RUN DEV = node server.js
 */
const { createServer } = require('http')
const { parse } = require('url')
const { createReadStream } = require('fs')
const next = require('next')
const compression = require('compression')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app.prepare().then(() => {
  app.use(compression())
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname } = parsedUrl

    if (pathname === '/sw.js') {
      res.setHeader('content-type', 'text/javascript')
      createReadStream('./offline/serviceWorker.js').pipe(res)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
})
