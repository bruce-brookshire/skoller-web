var _Environments = {
  development: {
    SERVER_NAME: 'http://localhost:4000'
  },
  staging: {
    SERVER_NAME: 'https://api.skoller.co'
  },
  production: {
    SERVER_NAME: ''
  }
}

function getEnvironment () {
  // Insert logic here to get the current platform (e.g. staging, production, etc)
  // var platform = getPlatform()
  var platform = 'staging'

  // ...now return the correct environment
  return _Environments[platform]
}

var Environment = getEnvironment()
module.exports = Environment
