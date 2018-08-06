const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage }).single('data')
const { Product } = require('../models/Product')

const {
  formatCsv,
  mapLegacyToCurrent,
  getCountDictionary,
  reduceDictionary } = require('../helpers')


module.exports = {
  uploadFile: (req, res, next) => 
    new Promise((resolve, reject) => {
      upload(req, res, (err) => {
        if (err) {
          reject(new Error('Error on Multer reading formData'))
          return;
        }
        resolve(next)
      })
    }),

  bufferToString: (req, res, next) => 
    new Promise((resolve, reject) => {
      if (req.file.buffer) {
        req.csv = req.file.buffer.toString()
        resolve(next)
      } else {
        reject(new Error('No buffer on the request object'))
      }
    }),

  csvToObject: (req, res, next) =>
    new Promise((resolve, reject) => {
      try {
        let collection = formatCsv(req.csv)
          .map(mapLegacyToCurrent)
        req.results = collection
        resolve(next)
      } catch (e) {
        reject(new Error('Error inside CSV Map'))
        return;
      }
      // console.log('---->>  logging...\n', JSON.stringify(collection, undefined, 2))
    }),

  parseAndCountField: (req, res, next) => {
    Product.find().then((data) => {
      req.results = getCountDictionary(data)
      next()
    })
      .catch((err) => { throw new Error(err) })
  },

  getMostRepeatedWords: (req, res, next) => {
    req.results = reduceDictionary(req.results)
    next()
  }

  // generateCsv: (req, res, next) => {
  //   Product.find().then((data) => {
  //     let parseDB = new ParseDB(data)
  //     if (parseDB) {
  //       req.results = parseDB.getCountDictionary().reduce(convert.generateCsv)
  //     } else {

  //     }
  //   })
  //     .then(() => next())
  //     .catch((err) => { throw err })
  // }
}
