import React, { Suspense } from 'react'

import Routes from './Routes'
import PageProgress from './PageProgress'

const App = () => (
  <Suspense fallback={<PageProgress />}>
    <Routes />
  </Suspense>
)

export default App
