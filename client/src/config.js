const { REACT_APP_BASE_PATH, NODE_ENV } = process.env

export default {
  basePath: REACT_APP_BASE_PATH,
  inProduction: NODE_ENV === 'production',
}
