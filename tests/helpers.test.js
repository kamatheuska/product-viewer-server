process.env.NODE_ENV = 'test'

const test = require('tape')
const {
    formatCsv,
    isTruthy
} = require('../helpers')

test('FORMAT CSV: ', { skip: false }, (t) => {
    t.comment('+-------------------------------------------------------HELPERS+')
    t.test('it should return an object from a csv formatted string', { skip: false }, function (assert) {
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
    t.test('isTruthy() should return a boolean', { skip: false }, function (assert) {
        let testStr = 'This is a test'
        let result = isTruthy(testStr)
        assert.true(result,
            'Response should be true')
        assert.end()
    })

    t.test('isTruthy() should resolve with a value of false', { skip: false }, function (assert) {
        let testBadStr = null
        let result = isTruthy(testBadStr)
        assert.true(!result,
            'Response should not exist. A rejected objected should pass instead')
        assert.end()
    })
})
