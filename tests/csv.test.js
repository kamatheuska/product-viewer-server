process.env.NODE_ENV = 'test'

const test = require('tape')
const request = require('supertest')
const path = require('path')

const { app } = require('../app.js')

const { mongoose } = require('../db/mongoose')

const { Product } = require('../models/Product')
const {
    populateCollection,
    seed,
    clearCollection
} = require('./seed')
const { isObject } = require('../helpers')

test.onFinish(() => {
    mongoose.models = {}
    mongoose.modelSchemas = {}
    mongoose.connection.close()
})

clearCollection(Product)
test('Given a string in .csv format', { skip: false }, function (t) {
    t.comment('+-------------------------------------------------------CSV+')
    t.test('Should pass: ', { skip: false }, function (assert) {
        request(app)
            .post('/api/convert')
            .attach('data', path.join(__dirname, '/seed/data.csv'))
            .expect(200)
            .end((err, res) => {
                if (err) {
                    console.log('---->>  logging...\n', err)
                    console.log('---->>  logging...\n', res.error.text)
                    assert.error(err,
                        'Should return undefined if no error.')
                    assert.error(res.error.text,
                        'Should return undefined if no error in the server.')
                    assert.comment('EXITING TESTS: res.body undefined......')
                    assert.end()
                } else {
                    let keys = Object.keys(res.body[0])
                    assert.error(err,
                        'Should return undefined if no error.')
                    assert.error(res.error.text,
                        'Should return undefined if no error in the server.')
                    assert.true(isObject(res.body),
                        'Should return a parsed object.')
                    assert.equal(res.body.length, 4,
                        'Object returned should have a lenght of 4.')
                    assert.equal(typeof res.body[0].specs.color, 'string',
                        'Color property should be a string.')
                    assert.equal(res.body[0].rates.pvp.unit, 950,
                        'Price per unit should be equal to 950.')
                    assert.equal(res.body[1].rates.pvp.unit, 1700,
                        'Price per unit should be equal to 1700.')
                    assert.equal(keys.length, 8,
                        'Returned object should have 8 key value pairs.')

                    assert.end()
                }
            })
    })

    t.test('Should fail: ', { skip: false }, function (assert) {
        request(app)
            .post('/api/convert')
            .attach('data', path.join(__dirname, '/seed/wrong.csv'))
            .expect(400)
            .end((err) => {
                assert.error(err,
                    'Should return undefined if no error.')
                assert.end()
            })
    })
})

populateCollection(Product, seed.products, { skip: false })
test('Analize data in the DB: ', { skip: false }, (t) => {
    t.test('should return an array describing how many times are each word metioned in an the DB description', (assert) => {
        request(app)
            .get('/api/parse/count')
            .expect(200)
            .end((err, res) => {
                let dictionary = res.body
                assert.error(err,
                    'Should return undefined if no error.')
                assert.error(res.error.text,
                    'Should return undefined if no error in the server.')
                assert.true(isObject(dictionary[0]),
                    'Should return a parsed object.')
                assert.equal(typeof dictionary[0].word, 'string',
                    'Word property should be atring')
                assert.equal(typeof dictionary[0].count, 'number',
                    'Count property should be atring')
                assert.end()
            })
    })

    // t.test('should return a CSV formatted text with the parsed document in descending order', (done) => {
    //   request(app)
    //     .get('/api/convert/csv')
    //     .expect(200)
    //     .expect((res) => {
    //       let csv = res.body.csv
    //       console.log(csv)
    //       csv[0].should.be.an('object')
    //       csv[0].word.should.be.a('string')
    //       csv[0].count.should.be.a('number')
    //     })
    //     .then(() => done())
    //     .catch(e => done(e))
    // })
})
