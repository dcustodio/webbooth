const nconf = require('nconf')
const path = require('path')

nconf.argv().env()
var environment = nconf.get('NODE_ENV') || 'development'

try {
  console.log(environment, path(__dirname))
  nconf.file(path.resolve(__dirname, './api.config.json'))
} catch (error) {
  console.log(error)
}

module.exports = nconf
