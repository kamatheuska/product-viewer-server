const express = require('express')
const router = express.Router()
const { Product } = require('../models/Product')

// GET PRODUCTS
router.get('/', (req, res) => {
    Product.find()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

router.post('/add', (req, res) => {
    let items = req.body
    Product.insertMany(items)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

// UPDATE PRODUCT
router.put('/update/:id', (req, res) => {
    let update = req.body

    let id = req.params.id
    Product.findById(id)
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

// QUERY ON DESCRIPTION
router.post('/query', (req, res) => {
    console.log('---->>  logging...\n', req.body.query)
    Product.findByQuery(req.body.query)
        .then((product) => {
            if (product.length === 0) {
                res.status(404).send()
            } else {
                res.status(200).send(product)
            }
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

router.delete('/delete/:id', (req, res) => {
    let id = req.params.id

    Product.findByIdAndRemove(id)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
})

module.exports = router
