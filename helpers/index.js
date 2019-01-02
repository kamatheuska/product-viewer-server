const {
    formatCsv,
    validateString,
    getUniqueElements,
    mapLegacyToCurrent
} = require('./convert')

const {
    getCountDictionary,
    reduceDictionary
} = require('./parse')

const {
    isTruthy,
    isObject,
    isGreaterNumber
} = require('./validate')

module.exports = {
    wrapAsync (middlewarePromise) { 
        return (req, res, next) =>
            middlewarePromise(req, res, next)
                .then(() => next())
                .catch(next)
    },
    formatCsv,
    validateString,
    getUniqueElements,
    mapLegacyToCurrent,
    getCountDictionary,
    isTruthy,
    isObject,
    isGreaterNumber,
    reduceDictionary
}
