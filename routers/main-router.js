'use strict'

const main = require('../controllers/main-controller')
const Router = require('koa-router')

// We configure the router to have the prefix of the main controller
let router = new Router({
  prefix: '/data'
})

/** Generate an array with 1000 objects with random data */
router.get('/', main.generateData)

module.exports = router
