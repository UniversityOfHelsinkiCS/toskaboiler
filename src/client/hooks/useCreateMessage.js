import { useMutation } from 'react-query'

import apiClient from '../utils/apiClient'

const useCreateMessage = (options = {}) => {
  const mutationFn = async (message) => {
    const { data } = await apiClient.post('/messages', message)

    return data
  }

  const mutation = useMutation(mutationFn, options)

  return mutation
}

export default useCreateMessage
