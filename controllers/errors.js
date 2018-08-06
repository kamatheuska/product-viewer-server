const express = require('express')
const router = express.Router()
const { AssertionError } = require('assert');

router.use((error, req, res, next) => {
  console.log('ERRRRRROR\n', error)
  if (error instanceof AssertionError) {
    return res.status(400).json({
      type: 'AssertionError',
      message: error.message
    });
  } else {
    next(error);
  }
});

module.exports = router
