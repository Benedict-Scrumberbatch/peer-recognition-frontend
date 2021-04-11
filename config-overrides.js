const {alias} = require('react-app-rewire-alias')

module.exports = function override(config) {
  alias({
    '@components': 'src/components',
    '@assets' : 'src/assets',
    "typeorm": "./node_modules/typeorm/typeorm-model-shim.js"
  })(config)

  return config
}