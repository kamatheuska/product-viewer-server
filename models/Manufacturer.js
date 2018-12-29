const mongoose = require('mongoose')
const Types = mongoose.Schema.Types
const _ = require('lodash')

const { isTruthy } = require('../helpers')
const { countries } = require('../public/dictionary')

const ManufacturerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: isTruthy,
        minlength: 1
    },
    products: {
        inStock: [{ type: Types.ObjectId, ref: 'Product' }]
    },
    country: {
        type: String,
        enum: countries,
        required: [true, 'El pais de origen es un campo necesario.']
    }
})

ManufacturerSchema.methods.setProperties = function (props) {
    return _.merge(this, props)
}

const Manufacturer = mongoose.model('Manufacturer', ManufacturerSchema)

module.exports = { Manufacturer }
