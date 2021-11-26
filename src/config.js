/**
 * Insert application wide common items here
 */

const IN_PRODUCTION = process.env.NODE_ENV === 'production'

const BASE_PATH = process.env.PUBLIC_URL || ''

const GIT_SHA = process.env.REACT_APP_GIT_SHA || ''

module.exports = {
  IN_PRODUCTION,
  BASE_PATH,
  GIT_SHA,
}
