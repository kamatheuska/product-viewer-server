const { mongoose } = require('../../db')
const {
    products,
    manufacturers,
    designers
} = require('./seed')

module.exports = {
    seedItems: (type = 'products') => {
        switch (type) {
            case 'manufacturers':
                return manufacturers
            case 'designers':
                return designers
            default:
                return products
        }
    },

    populateCollection: (tape, { model, items, skip = false }) => {
        tape.test(`SETUP: Populating Collection ....${model.modelName}`, { skip }, function (assert) {
            model.deleteMany({})
                .then(() => Promise.all(items.map((item) => model(item).save())))
                .then((res) => {
                    assert.true(res, 'Populate successfull')
                    assert.end()
                })
                .catch(assert.end)
        })
    },

    clearCollection: (t, { model, skip = false }) => {
        t.test('SETUP: Removing...', { skip }, function (assert) {
            model.deleteMany({})
                .then((res) => {
                    assert.true(res)
                    assert.end()
                })
                .catch((error) => assert.end(error))
        })
    },

    teardown: (models, failure = false) => {
        let promiseArray = []
        for (let i = 0; i < models.length; i++) {
            promiseArray.push(models[i].deleteMany({}))
        }
        Promise.all(promiseArray)
            .then((res) => {
                failure ? console.log('onFailure\n', res) : console.log('onFinish\n', res)
                mongoose.models = {}
                mongoose.modelSchemas = {}
                mongoose.connection.close()
            })
    }
}
