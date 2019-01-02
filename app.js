const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express()
const dist = path.join(__dirname, 'dist')
const {
    nodeEnv
} = require('./config')
const {
    undefinedError,
    validationError,
    assertionError
} = require('./middleware/errors')
const {
    connectToDatabase
} = require('./db')

app.use(express.static(dist))

connectToDatabase()

if (nodeEnv === 'development' || nodeEnv === 'test') {
    app.use(morgan('dev'))
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./controllers'))

app.get('/', (req, res) => {
    res.sendFile(dist + '/index.html')
})

app.use(assertionError)
app.use(validationError)
app.use(undefinedError)

module.exports = { app }
