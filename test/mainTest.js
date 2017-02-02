'use strict'

const ensure = require('certainty').ensure

describe('Promotions /promotions', function () {

  before(function* () {
    this.agent = global.test.agent
  })

  it('should get an array with 1000 objects', function* () {
    let data = yield this.agent.get('/data')

    ensure(data.body.data).hasLength(1000)
    ensure(data.body.data).isNotEmpty()
  })

  it('should check the typeof every element', function* () {
    let data = yield this.agent.get('/data')

    data.body.data.map((value) => {
      ensure(value.x).hasType('number')
      ensure(value.date).hasType('string')
    })
  })

})
