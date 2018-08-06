process.env.NODE_ENV = 'test'

const test = require('tape').test
const request = require('supertest')

const { app } = require('../app.js')
const { mongoose } = require('../db/mongoose')
const { isObject, isGreaterNumber } = require('../helpers')

const { Designer } = require('../models/Designer')
const { populateCollection, seed } = require('./seed')

test.onFinish(() => {
  mongoose.models = {}
  mongoose.modelSchemas = {}
  mongoose.connection.close()
})

test('POST /designers/add', { skip: false }, (t) => {
  t.comment('+-------------------------------------------------------DESIGNERS+')
  t.test('Add a new item to the designer collection', { skip: false }, function (assert) {
    request(app)
      .post('/designers/add')
      .send(seed.designers[0])
      .expect(200)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.error(res.error,
          'Should return undefined if no error in the server.')
        Designer.findById(res.body._id).then((item) => {
          assert.true(isObject(item),
            'Item exist and is an object')
          assert.true(isGreaterNumber(item.bio.died, 1000),
            'Year of dead should be greater than 1000')
          assert.true(isGreaterNumber(item.bio.born, 1000),
            'Year of birth should be greater than 1000')
          assert.end()
        }).catch((err) => {
          assert.error(err, 'Should not be returned')
          assert.end()
        })
      })
  })

  t.test('FAIL: Add a designer without name', { skip: false }, function (assert) {
    let fail = {
      name: '',
      country: 'COLOMBIA',
      bio: {
        born: null,
        died: 1450,
        body: 'asdassasdas'
      }
    }
    fail.name = ''
    request(app)
      .post('/designers/add')
      .send(fail)
      .expect(400)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        assert.true(res.error,
          'Should return an error object')
        assert.end()
      })
  })
})

populateCollection(Designer, seed.designers, false)
test('GET /designers', { skip: false }, (t) => {
  t.test('Should get all the designers in the DB', function (assert) {
    request(app)
      .get('/designers')
      .expect(200)
      .end((err, res) => {
        let keys = Object.keys(res.body[0])
        assert.error(err,
          'Should return undefined if no error.')
        assert.error(res.error.text,
          'Should return undefined if no error in the server.')
        assert.true(isObject(res.body),
          'Should return a parsed object.')
        assert.equal(res.body[0].bio.born, 1400,
          'Model of returned designer should equal 1400')
        assert.equal(res.body.length, 4,
          'Object returned should have a lenght of 4.')
        assert.equal(keys.length, 6,
          'Returned object should have 6 key value pairs.')
        assert.end()
      })
  })
})

populateCollection(Designer, seed.designers, false)
test('UPDATE /designers/update', { skip: false }, (t) => {
  let update = {
    name: 'BEST NAME UPDATE!!',
    bio: { born: 2018 }
  }
  t.test('should update a designer on the DB with the provided ID', { skip: false }, function (assert) {
    request(app)
      .get('/designers')
      .then((res) => {
        assert.equal(res.body.length, 4,
          'Object before UPDATING should have a length of 4')
        return res.body[0]._id
      })
      .then((id) => {
        request(app)
          .put(`/designers/update/${id}`)
          .send(update)
          .expect(200)
          .end((err, res) => {
            assert.error(err,
              'Should return undefined if no error.')
            assert.error(res.error.text,
              'Should return undefined if no error in the server.')
            assert.true(isObject(res.body),
              'Should return a parsed object.')
            assert.equal(res.body.bio.born, update.bio.born,
              'Born property should equal 2018')
            assert.end()
          })
      })
  })

  t.test('should fail updating an item on the DB with a falsy ID', { skip: false }, (assert) => {
    let falsyID = 1234124134543
    request(app)
      .put(`/designer/update/${falsyID}`)
      .send(update)
      .expect(400)
      .end((err, res) => {
        assert.true(err,
          'Should return an error.')
        assert.true(isObject(res.body),
          'Should return a error object.')
        assert.end()
      })
  })
})

populateCollection(Designer, seed.designers, { skip: false })
test('DELETE /designers', { skip: false }, function (t) {
  t.test('should delete a designer from the DB with the provided ID', (assert) => {
    request(app)
      .get('/designers')
      .then((res) => {
        assert.equal(res.body.length, 4,
          'Object before DELETING should have a length of 4')
        return res.body[0]._id
      })
      .then((id) => {
        request(app)
          .delete(`/designers/delete/${id}`)
          .expect(200)
          .end((err, res) => {
            assert.error(err,
              'Should return undefined if no error.')
            assert.error(res.error.text,
              'Should return undefined if no error in the server.')
            Designer.find({}).then((data) => {
              assert.equal(data.length, 3,
                'Object after DELETING should have a length of 3')
              assert.end()
            })
          })
      })
  })

  t.test('should fail deleting a designer from the DB with a fake ID',  { skip: false }, (assert) => {
    request(app)
      .delete(`/designers/delete/999999`)
      .expect(400)
      .end((err, res) => {
        assert.error(err,
          'Should return undefined if no error.')
        Designer.find({}).then((data) => {
          assert.equal(data.length, 3,
            'Object after DELETING should have a length of 3')
          assert.end()
        })
      })
  })
})
