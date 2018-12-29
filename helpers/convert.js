const parse = require('csv-parse/lib/sync')
const _ = require('lodash')

const holder = {
    product: {
        title: '',
        model: '',
        description: '',
        rates: { pvp: { unit: 0 } },
        setup: { keywords: '' },
        specs: {
            amount: { collection: { isCollection: false }, units: 0 },
            designer: null,
            manufacturer: null,
            measures: {
                weight: 0,
                height: 0,
                long: 0,
                width: 0
            },
            color: '',
            year: 0,
            odor: ''
        },
        created: Date.now()
    }
}

const formatCsv = function (csv) {
    return parse(csv, {
        cast: true,
        columns: true
    })
}

const getUniqueElements = function (arr) {
    return arr.join(' ').split(' ').reduce((result, word) => {
        if (result.indexOf(word) === -1) {
            result += word + ' '
            return result
        }
        return result
    }, '')
}

const validateString = function (query) {
    return query.toString()
        .toUpperCase()
        .trim()
        .split(' ')
        .filter(word => word.length !== 0)
        .join(' ')
}

const mapLegacyToCurrent = function (legacy) {
    let current = _.cloneDeep(holder.product)
    for (let key in legacy) {
        switch (key.toLowerCase()) {
            case 'precio':
                current.rates.pvp.unit = legacy[key]
                break
            case 'modelo':
                current.model = legacy[key]
                break
            case 'nombre': {
                let name = validateString(legacy[key])
                current.description = name
                current.title = name.split(' ').slice(0, 5).join(' ')
                break
            }
            case 'stock total':
                current.specs.amount.units = legacy[key]
                break
        }
    }
    return current
}

module.exports = {
    formatCsv,
    validateString,
    getUniqueElements,
    mapLegacyToCurrent
}
