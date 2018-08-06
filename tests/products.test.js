process.env.NODE_ENV = 'test'

const test = require('tape').test
const request = require('supertest')

const { app } = require('../app.js')

const { mongoose } = require('../db/mongoose')

const { Product } = require('../models/Product', false)
const { populateCollection, seed, clearCollection } = require('./seed')
const { isObject, isGreaterNumber } = require('../helpers')

test.onFinish(() => {
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
})

clearCollection(Product)
test('POST /products/add', { skip: false }, (t) => {
  t.comment('+------------------------------------------------------PRODUCTS+')
  t.test('Add a BATCH of items to the DB: ', { skip: false } , function (assert) {
    request(app)
      .post('/products/add')
      .send([ seed.products[1], seed.products[2] ])
      .expect(200)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.error(res.error.text,
          'Should return undefined if no error in the server.')
        assert.true(isObject(res.body),
          'Should return a parsed object.')
        assert.true(isObject(res.body[0]),
          'Response body should contain a parsed object.')
        assert.equal(res.body[0].rates.pvp.unit, 2600,
          'Price per unit of first object should equal 2600')
        Product.findById(res.body[0]._id).then((item) => {
          assert.true(isObject(item),
            'Should return a added item.')
          assert.equal(item._id.toString(), res.body[0]._id,
            'Founded object id should match the returned from the API')
          assert.end()
        })
      })
  })

  t.test('Add ONE new product to the DB: ', { skip: false } , (assert) => {
    let item = {
      title: 'ALAMBRE DE MARMOL',
      model: 999888,
      description: 'ESTA es la MejOR DESCRIPCIOn de todas',
      rates: { pvp: { unit: 23 } },
      setup: { keywords: 'ALAMBRE' },
      specs: { amount: { collection: { isCollection: false } } }
    }

    request(app)
      .post('/products/add')
      .send([ item ])
      .expect(200)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.error(res.error.text,
          'Should return undefined if no error in the server.')
        assert.true(isObject(res.body),
          'Should return a parsed object.')
        assert.true(isObject(res.body[0]),
          'Response body should contain a parsed object.')
        assert.equal(res.body[0].rates.pvp.unit, 23,
          'Price per unit of first object should equal 23')

        Product.findById(res.body[0]._id).then((item) => {
          assert.true(isObject(item),
            'Should return the added item.')
          assert.equal(item._id.toString(), res.body[0]._id,
            'Founded object id should match the returned from the API')
          assert.equal(item.rates.pvp.unit, 23,
            'Price per unit of first object should equal 23')
          assert.end()
        })
      })
  })

  t.test('FAIL: Add one project without model: ', { skip: false } , (assert) => {
    let badItem = {
      title: 'MADERA DE MARMOL',
      model: null,
      rates: { pvp: { unit: 230 } },
      setup: { keywords: 'MADERA' },
      specs: { amount: { collection: { isCollection: false } } }
    }

    request(app)
      .post('/products/add')
      .send(badItem)
      .expect(400)
      .end((err) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.end()
      })
  })
})

populateCollection(Product, seed.products, true)
test('GET /products', { skip: false }, function (t) {
  t.test('should get all the products in DB', (assert) => {
    request(app)
      .get('/products')
      .expect(200)
      .end((err, res) => {
        let keys = Object.keys(res.body[0])
        assert.error(err,
          'Should return undefined if no error.')
        assert.error(res.error.text,
          'Should return undefined if no error in the server.')
        assert.true(isObject(res.body),
          'Should return a parsed object.')
        assert.equal(res.body[0].model, 10002999,
          'Model of returned product should equal 10002999')
        assert.equal(res.body.length, 3,
          'Object returned should have a lenght of 3.')
        assert.equal(keys.length, 8,
          'Returned object should have 8 key value pairs.')
        assert.end()
      })
  })
})

populateCollection(Product, seed.products, { skip: false })
test('POST /products/query', { skip: false }, function (t) {
  t.test('should get the products that match the ONE word query', (assert) => {
    request(app)
      .post('/products/query')
      .send({ query: 'unique' })
      .expect(200)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.error(res.error.text,
          'Should return undefined if no error in the server.')
        assert.true(isObject(res.body),
          'Should return a parsed object.')
        assert.equal(res.body.length, 1,
          'Object returned should have a lenght of 1.')
        assert.equal(res.body[0].rates.pvp.unit, 2600,
          'Price per unit of second returned object should equal 2600')
        assert.end()
      })
  })
  t.test('should get the products that match the TWO word query', (assert) => {
    request(app)
      .post('/products/query')
      .send({ query: 'espejo palisandro' })
      .expect(200)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.error(res.error.text,
          'Should return undefined if no error in the server.')
        assert.true(isObject(res.body),
          'Should return a parsed object.')
        assert.equal(res.body.length, 2,
          'Object returned should have a lenght of 2.')
        assert.equal(res.body[1].rates.pvp.unit, 1900,
          'Price per unit of second returned object should equal 1900')
        assert.end()
      })
  })
  t.test('should fail to get the products with a given query', (assert) => {
    request(app)
      .post('/products/query')
      .send({ query: 'dontexist' })
      .expect(404)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.true(isObject(res.body),
          'Should return a parsed object.')
        assert.equal(res.body.length, undefined,
          'Object returned should have a lenght of undefined.')
        assert.end()
      })
  })
})

populateCollection(Product, seed.products, { skip: false })
test('UPDATE /products/update', { skip: false }, (t) => {
  let update = {
    description: 'This is the best updated description',
    model: 11122233344,
    specs: { amount: { units: 20 } }
  }
  t.test('should update an item on the DB with the provided ID', function (assert) {
    request(app)
      .get('/products')
      .then((res) => {
        assert.equal(res.body.length, 3,
          'Object before UPDATING should have a length of 3')
        return res.body[0]._id
      })
      .then((id) => {
        request(app)
          .put(`/products/update/${id}`)
          .send(update)
          .expect(200)
          .end((err, res) => {
            assert.error(err,
              'Should return undefined if no error.')
            assert.error(res.error.text,
              'Should return undefined if no error in the server.')
            assert.true(isObject(res.body),
              'Should return a parsed object.')
            assert.true(res.body.rates,
              'Rates property should exist')
            assert.equal(res.body.rates.pvp.unit, 1700,
              'Price per unit of second returned object should equal 1700')
            assert.equal(res.body.specs.amount.units, 20,
              'Amount of returned object should equal 20')
            assert.equal(res.body.description, update.description,
              'Description should match update')
            assert.end()
          })
      })
  })
  t.test('should fail updating an item on the DB with a falsy ID', { skip: false }, (assert) => {
    let falsyID = 1234124134543
    request(app)
      .put(`/products/update/${falsyID}`)
      .send({
        description: 'This is the best updated description',
        model: 11122233344
      })
      .expect(400)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.true(isObject(res.body),
          'Should return a error object.')
        assert.end()
      })
  })
})

populateCollection(Product, seed.products, { skip: false })
test('DELETE /products', { skip: false }, function (t) {
  t.test('should delete a product from the DB with the provided ID', (assert) => {
    request(app)
      .get('/products')
      .then((res) => {
        assert.equal(res.body.length, 3,
          'Object before DELETING should have a length of 3')
        return res.body[0]._id
      })
      .then((id) => {
        request(app)
          .delete(`/products/delete/${id}`)
          .expect(200)
          .end((err, res) => {
            assert.error(err,
              'Should return undefined if no error.')
            assert.error(res.error.text,
              'Should return undefined if no error in the server.')
            Product.find({}).then((data) => {
              assert.equal(data.length, 2,
                'Object after DELETING should have a length of 2')
              assert.end()
            })
          })
      })
  })

  t.test('should fail deleting a product from the DB with a fake ID', (assert) => {
    request(app)
      .delete(`/products/delete/999999`)
      .expect(400)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        Product.find({}).then((data) => {
          assert.equal(data.length, 2,
            'Object after DELETING should have a length of 2')
          assert.end()
        })
      })
  })
})
