const express = require('express')
const router = express.Router()
const { Product } = require('../models/Product')
const {
  uploadFile, csvToObject,
  parseAndCountField, getMostRepeatedWords,
  bufferToString } = require('../middleware')
const { wrapAsync } = require('../helpers')

router.post('/convert',
  wrapAsync(uploadFile),
  wrapAsync(bufferToString),
  wrapAsync(csvToObject),
  (req, res) => {
  let collection = req.results

  Product.insertMany(collection)
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})


// router.use('/convert/csv', generateCsv)
router.use('/parse/count', parseAndCountField)
router.use('/parse/count', getMostRepeatedWords)
router.get('/parse/count', (req, res) => {
  let dictionary = req.results
  if (dictionary) {
    res.status(200).send(dictionary)
  } else {
    res.status(400).send()
  }
})

router.get('/convert/csv', (req, res) => {
  let csv = req.results
  if (csv) {
    res.status(200).send(csv)
  } else {
    res.status(400).send()
  }
})

module.exports = router
