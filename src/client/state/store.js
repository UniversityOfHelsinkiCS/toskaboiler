import { configureStore } from '@reduxjs/toolkit'

import counter from './counter'

const reducer = {
  counter,
}

const store = configureStore({
  reducer,
})

export default store
