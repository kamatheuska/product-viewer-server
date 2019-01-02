module.exports = {
    isTruthy: (el) => 
        el !== undefined && el !== null && el.length !== 0,

    isObject: (el) => el !== null && typeof el === 'object',

    isGreaterNumber: (a, b) => typeof a === 'number' && a > b
}
