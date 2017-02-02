'use strict'

const Handlebars = require('handlebars')

module.exports = {
  * escapeString (input) {
    return new Handlebars.SafeString(input)
  }
}
