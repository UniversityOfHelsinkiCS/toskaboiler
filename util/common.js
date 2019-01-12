/**
 * Insert application wide common items here
 */

const inProduction = process.env.NODE_ENV === 'production'

module.exports = {
  inProduction,
}
