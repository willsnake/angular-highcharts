'use strict'

const chalk = require('chalk')
const debug = require('../lib/debug')

module.exports = function errorHandler () {
  return function * (next) {
    try {
      yield next
    } catch (err) {
      let reporter = debug.error
      err.message = { status: 'error', message: err.message || err.name }
      err.code && (err.message.code = err.code)
      err.code && (reporter = debug.http.error)

      err.details && (err.message.details = err.details)

      reporter(err.message, err.stack)
      this.status = err.status || 503
      this.body = err.message || 'Oops! Something went wrong'
    }
  }
}
