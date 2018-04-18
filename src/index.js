import React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.min.css'

import App from './App'

render(
  <App />,
  document.getElementById('root'),
)

if (module.hot) {
  module.hot.accept()
}
