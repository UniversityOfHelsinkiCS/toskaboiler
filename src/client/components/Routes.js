import React, { Suspense, useEffect } from 'react'
import { Route, Routes as RouterRoutes, Navigate } from 'react-router-dom'
import { Container } from '@mui/material'
import { initShibbolethPinger } from 'unfuck-spa-shibboleth-session'

import PageProgress from './PageProgress'
import AppBar from './AppBar'
import Footer from './Footer'

const Home = React.lazy(() => import('./Home'))
const Messages = React.lazy(() => import('./Messages'))
const Counter = React.lazy(() => import('./Counter'))

const RoutesConfig = () => (
  <RouterRoutes>
    <Route path="/" element={<Home />} exact />
    <Route path="messages" element={<Messages />} exact />
    <Route path="counter" element={<Counter />} exact />

    <Route path="*" element={<Navigate to="/" replace />} />
  </RouterRoutes>
)

const PrivateRoutes = () => {
  // Remove this if not used behind shibboleth
  useEffect(() => {
    initShibbolethPinger()
  }, [])

  return (
    <>
      <AppBar />
      <Container sx={{ my: 3 }}>
        <Suspense fallback={<PageProgress />}>
          <RoutesConfig />
        </Suspense>
      </Container>
      <Footer />
    </>
  )
}

export default PrivateRoutes
