import React, { useEffect } from 'react'
import { initShibbolethPinger } from 'unfuck-spa-shibboleth-session'
import NavBar from 'Components/NavBar'
import Footer from 'Components/Footer'
import Router from 'Components/Router'

export default () => {
  useEffect(() => {
    initShibbolethPinger() // Remove this if not used behind shibboleth
  }, [])

  return (
    <div>
      <NavBar />
      <Router />
      <Footer />
    </div>
  )
}
