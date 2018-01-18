'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  LATELIER_API_BASE_URL: '"https://latelier.co/data"',
  LATELIER_API_CATS_ENDPOINT: '"cats.json"'
})
