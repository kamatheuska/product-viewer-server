const express = require('express')
const router = express.Router()
const {
    Product
} = require('../models/Product')
const {
    throwNewError
} = require('../middleware/errors')

router.get('/', (req, res, next) => {
    Product.find()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(next)
})

router.post('/add', (req, res, next) => {
    let items = req.body
    Product.insertMany(items)
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(next)
})

router.put('/update/:id', (req, res, next) => {
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
        .catch(next)
})

router.post('/query', (req, res, next) => {
    Product.findByQuery(req.body.query)
        .then((product) => {
            if (product.length === 0) {
                let message = 'No products found'
                next(throwNewError(message, 'ValidationError'))
            } else {
                res.status(200).send(product)
            }
        })
        .catch(next)
})

router.delete('/delete/:id', (req, res, next) => {
    let id = req.params.id

    Product.findByIdAndRemove(id)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch(next)
})

module.exports = router
