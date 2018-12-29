const wrapAsync = (fn) =>
    (req, res, next) =>
        fn(req, res, next)
            .then(() => next())
            .catch((err) => {
                next(err)
            })
module.exports = { wrapAsync }
