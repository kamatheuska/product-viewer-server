const parse = require('csv-parse/lib/sync')
const _ = require('lodash')
const { isObject } = require('./validate')

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

function formatCsv (csv) {
  return parse(csv, {
    cast: true,
    columns: true
  })
}
/*
 * GET-UNIQUE-ELEMENTS: Use this baby to reduce an array with a lot of
 *                      repeated elements, and eliminate the copycats.
 *                      It takes an array as an argument (No objects, dont
 *                      get smart now), and returns a String.
 *
 */

function getUniqueElements (arr) {
  return arr.join(' ').split(' ').reduce((result, word) => {
    if (result.indexOf(word) === -1) {
      result += word + ' '
      return result
    }
    return result
  }, '')
}

/*
 * VALIDATE-QUERY: This one is to validate any string used to
 *                 query the Database. It returns a string of
 *                 valid words to query.
 *
 */

function validateString (query) {
  return query.toString()
    .toUpperCase()
    .trim()
    .split(' ')
    .filter(word => word.length !== 0)
    .join(' ')
}

/*
 * MAP-LEGACY-TO-CURRENT: This is a map that gets an object, already converted
 *                        from a .csv file, scans it for properties that match
 *                        the current model, and returns an object with new
 *                        keys and the old values.
 *
 */


function mapLegacyToCurrent (legacy, i) {
  // if (!isObject(legacy)) {
  //   return legacy;
  // }
  let current = _.cloneDeep(holder.product)
  for (let key in legacy) {
    switch (key.toLowerCase()) {
      case 'precio':
        current.rates.pvp.unit = legacy[key]
        break;
      case 'modelo':
        current.model = legacy[key]
        break;
      case 'nombre':
        let name = validateString(legacy[key])
        current.description = name
        current.title = name.split(' ').slice(0, 5).join(' ')
        break;
      case 'stock total':
        current.specs.amount.units = legacy[key]
        break;
    }
  }
  // console.log('---->>  logging...\n', JSON.stringify(current.rates, undefined, 2))
  return current
}

module.exports = {
  formatCsv,
  validateString,
  getUniqueElements,
  mapLegacyToCurrent
  // mapToObject
}
