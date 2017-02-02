'use strict'

const path = require('path')
const bodyParser = require('koa-bodyparser')
const koa = require('koa')
const config = require('./config/env')
const serve = require('koa-static')
const fs = require('fs')
const hbs = require('koa-hbs')

// Once kamaji is initiated, we can call the middlewares
const errorHandler = require('./middlewares/error-handler')
const cors = require('koa-cors')

let server = koa()

/** Middlewares */
server
  /** Add CORS */
  .use(cors())
  /** Enable body parsing */
  .use(bodyParser())
  /** Add error handler */
  .use(errorHandler())
  /** Add handlerbars */
  .use(hbs.middleware({
    viewPath: __dirname + '/public'
  }))
  /** Added the public folder */
  .use(serve('./public'))

/** Exports server listening if module parent (mocha, gulp) */
if (module.parent) {
  module.exports = server.listen()
} else {
  server.listen(config.port, function () {
    console.log('Server listening at %s', config.port)
  })
}

// Get routers
for (let controller of fs.readdirSync(path.resolve('routers'))) {
  let file = path.resolve('routers', controller)
  if (/\-router.js$/.test(file) && fs.statSync(file).isFile()) {
    try {
      server.use(require(file).routes())
    } catch (e) {
      console.error(e)
    }
  }
}
