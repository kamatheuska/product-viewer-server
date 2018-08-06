process.env.NODE_ENV = 'test'

const test = require('tape').test
const {
  formatCsv,
  isTruthy } = require('../helpers')
const { isObject, isGreaterNumber } = require('../helpers')

test('FORMAT CSV: ', { skip: false }, (t) => {
  t.comment('+-------------------------------------------------------HELPERS+')
  t.test('it should return an object from a csv formatted string', function (assert) {
    let csv =
      `first name, last name, email, date
       adam, doe, adamdoe@example.com, 1239755004
       chloe, jones, chloejones@example.com, 3246587124`

    let result = formatCsv(csv)
    assert.true(result,
      'The returned object should exist')
    assert.end()
  })
})

test('VALIDATION HELPERS:', { skip: false }, (t) => {
  t.test('isTruthy() is a Promise and should resolve with a boolean', function (assert) {
    let testStr = 'This is a test'

    isTruthy(testStr)
      .then((res) => {
        assert.true(res,
          'Response should be true')
        assert.end()
      })
      .catch((err) => err)
  })

  t.test('isTruthy() should resolve with a value of false', function (assert) {
    let testBadStr = null

    isTruthy(testBadStr)
      .then((res) => {
        assert.true(!res,
          'Response should not exist. A rejected objected should pass instead')
        assert.end()
      })
      .catch((err) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.end()
      })
  })
})
