'use strict'

const faker = require('faker')

let controller = {}

/**
 * Generates 1000 objects with random data
 * @param {Function} next
 */
controller.generateData = function *(next) {
  let data = []
  for (let i = 0; i < 1000; i++) {
    let from = new Date('2016-01-01')
    let to = new Date('2016-12-31')
    data.push({
      x: faker.random.number(),
      date: faker.date.between(from, to)
    })
  }
  this.body = { data: data }
  this.status = 200
  yield next
}

module.exports = controller
