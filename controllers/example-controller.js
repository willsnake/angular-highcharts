'use strict'

const handlebars = require('../helper/handlebars')

let controller = {}

/**
 * Render the main page
 * @param {Function} next
 */
controller.mainPage = function *(next) {
  yield this.render('index')
}

module.exports = controller
