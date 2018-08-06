const mongoose = require('mongoose')
const Types = mongoose.Schema.Types
const _ = require('lodash')

const { isTruthy } = require('../helpers')
const { countries } = require('../public/dictionary')

const DesignerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: isTruthy,
    minlength: 5
  },
  products: {
    inStock: [{ type: Types.ObjectId, ref: 'Product' }]
  },
  country: {
    type: String,
    enum: countries,
    required: [true, 'El pais de origen es un campo necesario.']
  },
  bio: {
    born: {
      type: Number,
      min: 1000,
      max: 2100,
      default: null
    },
    died: {
      type: Number,
      min: 1000,
      max: 2100,
      default: null
    },
    body: { type: String, minlength: 10 }
  }
})

DesignerSchema.methods.setProperties = function (props) {
  return _.merge(this, props)
}

const Designer = mongoose.model('Designer', DesignerSchema)

module.exports = { Designer }
