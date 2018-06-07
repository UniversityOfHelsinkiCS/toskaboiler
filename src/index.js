import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'

import store from './util/store'
import App from './components/App'

/*
import { isDevEnv } from './util/common'

if (!isDevEnv) {
  try {
    Raven.config('').install() // eslint-disable-line
  } catch (e) { } // eslint-disable-line
}
*/

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
}
