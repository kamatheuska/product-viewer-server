process.env.NODE_ENV = 'test'

// const test = require('tape')
// const app = require('../app')
// const request = require('supertest')

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
