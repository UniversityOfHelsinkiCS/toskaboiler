import callBuilder from '../apiConnection'

export const getPostFromApi = (code) => {
  const route = `https://jsonplaceholder.typicode.com/posts/${code}`
  const prefix = 'GET_SOMETHING'
  return callBuilder(route, prefix)
}

// This action is used to clear the error, for example after a timeout
export const clearPosts = () => ({ type: 'CLEAR_LIST' })

// Reducer
// You can include more app wide actions such as "selected: []" into the state
export default (state = { data: [] }, action) => {
  switch (action.type) {
    case 'GET_SOMETHING_ATTEMPT':
      return {
        ...state,
        pending: true,
      }
    case 'GET_SOMETHING_FAILURE':
      return {
        ...state,
        pending: false,
        error: true,
      }
    case 'GET_SOMETHING_SUCCESS':
      return {
        ...state,
        data: [...state.data.filter(item => item.id !== action.response.id), action.response],
        pending: false,
        error: false,
      }
    case 'CLEAR_LIST':
      return {
        ...state,
        data: [],
      }
    default:
      return state
  }
}
