class CustomError extends Error {
    constructor (message, type = 'CustomError', ...args) {
        super(...args)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CustomError)
        }
        this.type = type
        this.message = message
    }
}

module.exports = {
    CustomError
}
