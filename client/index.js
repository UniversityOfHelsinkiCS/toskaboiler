import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import 'semantic-ui-css/semantic.min.css'
import './assets/custom.css'

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

const refresh = () => render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)

refresh()

if (module.hot) {
  module.hot.accept()
}
