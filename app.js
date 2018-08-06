require('./config')

const path = require('path')
const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const { db } = require('./db/mongoose')
const app = express()
const dist = path.join(__dirname, 'dist')

app.use(express.static(dist))

if (process.env.NODE_ENV ==='development') {
  app.use(morgan('dev'))
}
app.use(morgan('dev'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('./controllers'))

app.get('/', (req, res) => {
  console.log('---->>  logging...\n')
  res.sendFile(dist + '/index.html')
})

module.exports = { app }
