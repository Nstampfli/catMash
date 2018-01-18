'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  LATELIER_API_BASE_URL: '"https://latelier.co/data"',
  LATELIER_API_CATS_ENDPOINT: '"cats.json"'
})
