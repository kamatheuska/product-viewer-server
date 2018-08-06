const express = require('express')
const router = express.Router()
const { Designer } = require('../models/Designer')

router.get('/', (req, res) => {
  Designer.find()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

router.post('/add', (req, res) => {
  let designer = new Designer(req.body)

  designer.save()
    .then((item) => {
      res.status(200).send(item)
    })
    .catch((err) => {
      // console.log('---->>  logging design..\n', err)
      res.status(400).json(err)
    })
})

router.put('/update/:id', (req, res) => {
  let update = req.body

  let id = req.params.id
  Designer.findById(id)
    .then((doc) => {
      let merged = doc.setProperties(update)
      return merged.save()
    })
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})


router.delete('/delete/:id', (req, res) => {
  let id = req.params.id
  Designer.findByIdAndRemove(id)
    .then((result) => {
      res.status(200).send(result)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})


module.exports = router
