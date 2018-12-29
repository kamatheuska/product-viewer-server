const httpMocks = require('node-mocks-http')

module.exports = {
    mockHttpObjects: (request, response, options, testOptions) => {
        let { skip, t } = testOptions
        t.test('SETUP HTTP MOCKS: ', skip, function (assert) {
            request = httpMocks.createRequest(options)
            response = httpMocks.createResponse(options)
            console.log('MIDDLESEED\n', request)
            assert.true(!!request,
                'Should return undefined if no request is not defined.')
            assert.true(response,
                'Should return undefined if no response is not defined.')
            assert.end()
        })
    }
}
