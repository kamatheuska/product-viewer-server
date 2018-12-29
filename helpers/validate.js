module.exports = {
    isTruthy: (el) => new Promise((resolve, reject) => {
        el !== undefined && el !== null && el.length !== 0
            ? resolve(true)
            : reject(false)
    }),

    isObject: (el) => el !== null && typeof el === 'object',

    isGreaterNumber: (a, b) => typeof a === 'number' && a > b
}
// console.log('INSIDE Schema\n', el)
