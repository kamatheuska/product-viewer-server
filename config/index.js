const getEnvVar = function (key, defaultValue = null) {
    if (process.env[key]) {
        return process.env[key]
    }
    if (defaultValue) {
        return defaultValue
    }
    throw new Error(`Required but not defined : Env Variable ${key}.`)
}

module.exports = {
    port: getEnvVar('PORT', 5000),
    nodeEnv: getEnvVar('NODE_ENV', 'development'),
    mongoDbUri: process.env.NODE_ENV === 'production'
        ? getEnvVar('MONGODB_URI')
        : process.env.NODE_ENV === 'test'
            ? getEnvVar(null, 'mongodb://localhost:27017/productViewerTest')
            : getEnvVar(null, 'mongodb://localhost:27017/productViewer')
}
