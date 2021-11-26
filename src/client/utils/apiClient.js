import axios from 'axios'
import { BASE_PATH, IN_PRODUCTION } from '../config'
import mockUserService from './mockUserService'
import loginAsService from './loginAsService'

const getUserHeaders = () => (IN_PRODUCTION ? {} : mockUserService.getHeaders())

const getLoggedInAsHeaders = () => loginAsService.getHeaders()

const apiClient = axios.create({ baseURL: `${BASE_PATH}/api` })

// Remove this if not used behind shibboleth
apiClient.interceptors.request.use((config) => {
  const headers = {
    ...config.headers,
    ...getUserHeaders(),
    ...getLoggedInAsHeaders(),
  }

  const newConfig = { ...config, headers }

  return newConfig
})

export default apiClient
