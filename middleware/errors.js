const { AssertionError } = require('assert')
const { CustomError } = require('../utils/errors')
module.exports = {
    throwNewError (message = '', type = 'NewError') {
        throw new CustomError(message, type)
    },

    validationError (error, req, res, next) {
        if (error.type === 'ValidationError') {
            return res.status(403).send(error)
        }
        next(error)
    },

    assertionError (error, req, res, next) {
        if (error instanceof AssertionError) {
            return res.status(400).json({
                type: 'AssertionError',
                message: error.message
            })
        }
        next(error)
    },

    undefinedError (error, req, res, next) { // eslint-disable-line
        res.status(400).send(error)
    }
}
