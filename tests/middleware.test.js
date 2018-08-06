process.env.NODE_ENV = 'test'

const test = require('tape')
const path = require('path')
const app = require('../app')


const { isObject, isGreaterNumber } = require('../helpers')

test('It should do something interesting', { skip: true }, (t) => {
  t.test('more stuff to assert', function (assert) {
    request(app)
      .get('some/cool/route')
      .send(obj)
      .expect(200)
      .end((err, res) => {
        assert.error(err,
        'Should return undefined if no error.')
        assert.end()
      })
  })
})
// let req, res

// const { bufferToString } = require('../middleware')
// const { mockHttpObjects, seed } = require('./seed')

// // const { mongoose } = require('../db/mongoose')
// // const { csv } = require('./seed')
// // test.onFinish(() => {
// //   mongoose.models = {}
// //   mongoose.modelSchemas = {}
// //   mongoose.connection.close()
// // })

// test('MIDDLEWARE: ', { skip: false }, (t) => {
//   let testOptions = { skip: { skip: false }, t }
//   let options = { file: { buffer: seed.buffer }}
//   mockHttpObjects(req, res, null, testOptions)
//   t.test('uploadFile should return a parsed object given a CSV formatted string.', function (assert) {
//     bufferToString(req, res)
//       .then((res) => {
//         assert.true(res,
//           'Should return undefined if no error')
//         assert.end()
//       })
//       .catch((err) => {
//         assert.end(err)
//       })
//   })
// })
