import { useQuery } from 'react-query'
import apiClient from '../utils/apiClient'

const useMessages = (options = {}) => {
  const queryKey = 'messages'

  const queryFn = async () => {
    const { data } = await apiClient.get('/messages')

    return data
  }

  const { data: messages, ...rest } = useQuery(queryKey, queryFn, options)

  return { messages, ...rest }
}

export default useMessages
