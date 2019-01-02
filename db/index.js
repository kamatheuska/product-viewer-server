const mongoose = require('mongoose')
const {
    mongoDbUri
} = require('../config')

const db = mongoose.connection
mongoose.Promise = global.Promise

module.exports = {
    connectToDatabase () {
        mongoose.connect(mongoDbUri, {
            useNewUrlParser: true
        })
        db.on('error', console.error.bind(console, 'connection error:'))
        mongoose.plugin((schema) => {
            schema.options.usePushEach = true
        })
    },
    db,
    mongoose
}
