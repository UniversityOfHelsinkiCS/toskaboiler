const config = require('../config')

const PORT = process.env.PORT || 8000

module.exports = {
  ...config,
  PORT,
}
