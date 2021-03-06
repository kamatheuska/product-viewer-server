process.env.NODE_ENV = 'test'

const test = require('tape').test
const request = require('supertest')

const { app } = require('../app.js')
const { Manufacturer } = require('../models/Manufacturer')
const { isObject } = require('../helpers')

const {
    populateCollection,
    clearCollection,
    seedItems,
    teardown
} = require('./seed/utils')

test.onFinish(() => teardown([ Manufacturer ]))
test.onFailure(() => teardown([ Manufacturer ], true))

test('POST /manufacturers/add', { skip: false }, (t) => {
    t.comment('+----------------------------------------------------MANUFACTURERS+')
    clearCollection(t, { model: Manufacturer })
    let manufacturers = seedItems('manufacturers')

    t.test('Add a new item to the manufacturers collection', { skip: false }, function (assert) {
        request(app)
            .post('/manufacturers/add')
            .send(manufacturers[0])
            .expect(200)
            .expect((res) => {
                assert.error(res.error,
                    'Should return undefined if no error in the server.')
                Manufacturer
                    .findById(res.body._id)
                    .then((item) => {
                        assert.true(isObject(item),
                            'Item exist and is an object')
                        assert.equal(item.country, manufacturers[0].country,
                            'Entry should be equal to added manufacturer')
                    })
                    .catch(assert.error)
            })
            .end(assert.end)
    })

    t.test('FAIL: Add a manufacturer without name', { skip: false }, function (assert) {
        let fail = {
            name: '',
            country: 'COLOMBIA'
        }
        fail.name = ''
        request(app)
            .post('/manufacturers/add')
            .send(fail)
            .expect(400)
            .end(assert.end)
    })
})

test('GET /manufacturers', { skip: false }, (t) => {
    let manufacturers = seedItems('manufacturers')
    populateCollection(t, { model: Manufacturer, items: manufacturers })

    t.test('Should get all the manufacturers in the DB', function (assert) {
        request(app)
            .get('/manufacturers')
            .expect(200)
            .expect((res) => {
                let keys = Object.keys(res.body[0])
                console.log('Printing- - - - -:res.body', res.body)
                assert.error(res.error.text,
                    'Should return undefined if no error in the server.')
                assert.true(isObject(res.body),
                    'Should return a parsed object.')
                assert.equal(res.body.length, 3,
                    'Object returned should have a lenght of 3.')
                assert.equal(keys.length, 5,
                    'Returned object should have 5 key value pairs.')
            })
            .end(assert.end)
    })
})

test('UPDATE /manufacturers/update', { skip: false }, (t) => {
    let update = {
        name: 'BEST NAME UPDATE!!',
        country: 'ALBANIA'
    }
    let manufacturers = seedItems('manufacturers')
    populateCollection(t, { model: Manufacturer, items: manufacturers })

    t.test('should update a manufacturer on the DB with the provided ID', { skip: false }, function (assert) {
        request(app)
            .get('/manufacturers')
            .then((res) => {
                assert.equal(res.body.length, 3,
                    'Object before UPDATING should have a length of 3')
                return res.body[0]._id
            })
            .then((id) => {
                request(app)
                    .put(`/manufacturers/update/${id}`)
                    .send(update)
                    .expect(200)
                    .expect((res) => {
                        assert.error(res.error.text,
                            'Should return undefined if no error in the server.')
                        assert.true(isObject(res.body),
                            'Should return a parsed object.')
                        assert.equal(res.body.name, update.name,
                            'Born property should equal 2018')
                    })
                    .end(assert.end)
            })
    })

    t.test('should fail updating an item on the DB with a falsy ID', { skip: false }, (assert) => {
        let falsyID = 1234124134543
        request(app)
            .put(`/manufacturer/update/${falsyID}`)
            .send(update)
            .expect(404)
            .end(assert.end)
    })

    t.test('should fail updating an item on the DB with a falsy country', { skip: false }, (assert) => {
        let badItem = {
            name: 'Some Fabric',
            country: ' A really bad country'
        }

        request(app)
            .get('/manufacturers')
            .then((res) => {
                assert.equal(res.body.length, 3,
                    'Object before UPDATING should have a length of 3')
                return res.body[0]._id
            })
            .then((id) => {
                request(app)
                    .put(`/manufacturer/update/${id}`)
                    .send(badItem)
                    .expect(404)
                    .end(assert.end)
            })
    })
})

test('DELETE /manufacturers', { skip: false }, function (t) {
    let manufacturers = seedItems('manufacturers')
    populateCollection(t, { model: Manufacturer, items: manufacturers })

    t.test('should delete a manufacturer from the DB with the provided ID', (assert) => {
        request(app)
            .get('/manufacturers')
            .then((res) => {
                assert.equal(res.body.length, 3,
                    'Object before DELETING should have a length of 3')
                return res.body[0]._id
            })
            .then((id) => {
                request(app)
                    .delete(`/manufacturers/delete/${id}`)
                    .expect(200)
                    .expect((res) => {
                        assert.error(res.error.text,
                            'Should return undefined if no error in the server.')
                        Manufacturer
                            .find({})
                            .then((data) => {
                                assert.equal(data.length, 2,
                                    'Object after DELETING should have a length of 2')
                            })
                            .catch(assert.error)
                    })
                    .end(assert.end)
            })
    })

    t.test('should fail deleting a manufacturer from the DB with a fake ID', { skip: false }, (assert) => {
        request(app)
            .delete(`/manufacturers/delete/999999`)
            .expect(400)
            .expect((res) => {
                Manufacturer
                    .find({})
                    .then((data) => {
                        assert.equal(data.length, 2,
                            'Object after DELETING should have a length of 2')
                    })
                    .catch(assert.error)
            })
            .end(assert.end)
    })
})
