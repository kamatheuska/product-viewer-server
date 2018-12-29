const mongoose = require('mongoose')
const _ = require('lodash')
const { validateString } = require('../helpers')
const Types = mongoose.Schema.Types

const ProductSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 6,
        required: true
    },
    description: {
        type: String,
        text: true,
        minlength: 7,
        required: true
    },
    model: {
        type: Number,
        minlength: 6,
        required: true,
        unique: true
    },
    rates: {
        pvp: {
            unit: { type: Number, min: 1, required: true },
            collection: { type: Number, default: 1 }
        },
        cost: { type: Number, default: 0 }
    },
    setup: { family: String, category: String, subcategory: String },
    specs: {
        amount: {
            collection: {
                isCollection: { type: Boolean, required: true },
                units: { type: Number, min: 0 }
            },
            units: { type: Number, min: 1 }
        },
        designer: [{ type: Types.ObjectId, ref: 'Designer' }],
        // designer: { name: String, origin: String },
        manufacturer: { name: String, origin: String },
        measures: {
            weight: Number,
            height: Number,
            long: Number,
            width: Number
        },
        year: Number,
        color: String,
        odor: String
    },
    created: { type: Number, default: Date.now() }
})
// }, { usePushEach: true })

// ProductSchema.statics.getKeywords = function () {
//   return this.find().then((products, err) => {
//     if (err) throw new Error(err)

//     let keywords = products.map(product => product.setup.keywords)
//     return getUniqueElements(keywords)
//   })
// }

ProductSchema.statics.findByQuery = function (query) {
    let reg = validateString(query)
        .split(' ')
        .reduce((final, word) => {
            return `"${final}" "${word}"`
        })
    return this.find({ $text: { $search: reg } })
}

ProductSchema.methods.setProperties = function (props) {
    return _.merge(this, props)
}

const Product = mongoose.model('Product', ProductSchema)

module.exports = { Product }
