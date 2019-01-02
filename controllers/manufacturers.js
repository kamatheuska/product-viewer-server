const express = require('express')
const router = express.Router()
const { Manufacturer } = require('../models/Manufacturer')

router.get('/', (req, res, next) => {
    Manufacturer.find()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(next)
})

router.post('/add', (req, res, next) => {
    let manufacturer = new Manufacturer(req.body)

    manufacturer.save()
        .then((item) => {
            res.status(200).send(item)
        })
        .catch(next)
})

router.put('/update/:id', (req, res, next) => {
    let update = req.body

    let id = req.params.id
    Manufacturer.findById(id)
        .then((doc) => {
            let merged = doc.setProperties(update)
            return merged.save()
        })
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(next)
})

router.delete('/delete/:id', (req, res, next) => {
    let id = req.params.id
    Manufacturer.findByIdAndRemove(id)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch(next)
})

module.exports = router
