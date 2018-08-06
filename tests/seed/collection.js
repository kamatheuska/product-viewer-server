const test = require('tape').test

module.exports = {
  populateCollection: (model, items, skip) => {
    test('SETUP: Populating...', skip, function (assert) {
      model.remove({})
        .then(() => model.insertMany(items))
        .then((res) => {
          assert.end()
        })
        .catch((err) => {
          assert.end()
          return err
        })
    })
  },

clearCollection: (model, skip) => {
  test('SETUP: Removing...',  skip, function (assert) {
    model.remove({})
      // .then(() => model.find({}))
      .then((res) => {
        assert.end()
      })
      .catch((err) => {
        assert.end()
        return err
      })
    })
  }
}
