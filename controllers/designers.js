const express = require('express')
const router = express.Router()
const { Designer } = require('../models/Designer')

router.get('/', (req, res, next) => {
    Designer.find()
        .then((data) => {
            res.status(200).send(data)
        })
        .catch(next)
})

router.post('/add', (req, res, next) => {
    let designer = new Designer(req.body)

    designer.save()
        .then((item) => {
            res.status(200).send(item)
        })
        .catch(next)
})

router.put('/update/:id', (req, res, next) => {
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
        .catch(next)
})

router.delete('/delete/:id', (req, res, next) => {
    let id = req.params.id
    Designer.findByIdAndRemove(id)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch(next)
})

module.exports = router
