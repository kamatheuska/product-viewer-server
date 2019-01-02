const express = require('express')
const router = express.Router()
const {
    Product
} = require('../models/Product')
const {
    uploadFile,
    csvToObject,
    parseAndCountField,
    getMostRepeatedWords,
    bufferToString
} = require('../middleware')
const {
    throwNewError
} = require('../middleware/errors')
const {
    wrapAsync,
    isObject
} = require('../helpers')

router.post('/convert',
    wrapAsync(uploadFile),
    wrapAsync(bufferToString),
    wrapAsync(csvToObject),

    (req, res, next) => {
        let collection = req.results

        Product.insertMany(collection)
            .then((data) => {
                res.status(200).send(data)
            })
            .catch(next)
    })

router.get('/parse/count',
    parseAndCountField,
    getMostRepeatedWords,

    (req, res, next) => {
        let dictionary = req.results
        if (isObject(dictionary)) {
            res.status(200).send(dictionary)
        } else {
            next(throwNewError())
        }
    })

router.get('/convert/csv', (req, res, next) => {
    let csv = req.results
    if (isObject(csv)) {
        res.status(200).send(csv)
    } else {
        next(throwNewError())
    }
})

module.exports = router
