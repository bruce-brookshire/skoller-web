var _Environments = {
  development: {
    SERVER_NAME: 'http://localhost:4000',
    IS_DEV: true,
    NAME: 'dev'
  },
  staging: {
    SERVER_NAME: 'https://api-staging.skoller.co',
    IS_DEV: true,
    NAME: 'stg'
  },
  production: {
    SERVER_NAME: 'https://api.skoller.co',
    IS_DEV: false,
    NAME: ''
  }
}

function getEnvironment () {
  // Insert logic here to get the current platform (e.g. staging, production, etc)
  // var platform = getPlatform()
  var platform = 'development'

  // ...now return the correct environment
  return _Environments[platform]
}

var Environment = getEnvironment()
module.exports = Environment
