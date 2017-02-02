'use strict'

const example = require('../controllers/example-controller')
const Router = require('koa-router')

// We configure the router to have the prefix of the example controller
let router = new Router({
  prefix: '/example'
})

/** Render the main page */
router.get('/', example.mainPage)

module.exports = router
