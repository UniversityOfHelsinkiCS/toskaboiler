import { useQuery } from 'react-query'
import apiClient from '../utils/apiClient'

const useMessage = (id, options = {}) => {
  const queryKey = ['message', id]

  const queryFn = async () => {
    const { data } = await apiClient.get(`/messages/${id}`)

    return data
  }

  const { data: message, ...rest } = useQuery(queryKey, queryFn, {
    enabled: Boolean(id),
    ...options,
  })

  return { message, ...rest }
}

export default useMessage
