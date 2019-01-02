const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage }).single('data')
const {
    Product
} = require('../models/Product')
const {
    throwNewError
} = require('../middleware/errors')
const {
    formatCsv,
    mapLegacyToCurrent,
    getCountDictionary,
    reduceDictionary
} = require('../helpers')

module.exports = {
    uploadFile: (req, res, next) =>
        new Promise((resolve, reject) => {
            upload(req, res, (error) => {
                if (error) {
                    reject(throwNewError('Error on Multer reading formData'))
                } else {
                    resolve(next)
                }
            })
        }),

    bufferToString: (req, res, next) =>
        new Promise((resolve, reject) => {
            if (req.file.buffer) {
                req.csv = req.file.buffer.toString()
                resolve(next)
            } else {
                reject(throwNewError('No buffer on the request object'))
            }
        }),

    csvToObject: (req, res, next) =>
        new Promise((resolve, reject) => {
            try {
                req.results = formatCsv(req.csv)
                    .map(mapLegacyToCurrent)
                resolve(next)
            } catch (e) {
                reject(throwNewError('Error inside CSV Map'))
            }
        }),

    parseAndCountField: (req, res, next) => {
        Product
            .find()
            .then((data) => {
                req.results = getCountDictionary(data)
                next()
            })
            .catch(throwNewError)
    },

    getMostRepeatedWords: (req, res, next) => {
        req.results = reduceDictionary(req.results)
        next()
    }
}
