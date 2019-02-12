import React from 'react'
import { node } from 'prop-types'
import Nprogress from 'nprogress'
import Router from 'next/router'
import Nav from './Nav'
import Meta from './Meta'
import LoginGate from '../../features/login_signup/components/LoginGate'

/**
 * Progress bar for visibility of network progess as the app is a single page application.
 */
Router.onRouteChangeStart = () => {
  Nprogress.start()
}
Router.onRouteChangeComplete = () => {
  Nprogress.done()
}
Router.onRouteChangeError = () => {
  Nprogress.done()
}


/**
 * Functional component for wrapping all page componens in Nav, loginGate and themeProvider.
 */
const Page = ({ route, children }) => {
  const byPassPage = route === '/login'
  return (
    <>
      <Meta />
      {!byPassPage
        ? <>
          <Nav />
          <div style={{ padding: '25px' }}>
            {children}
          </div>
        </>
        : <>{children}</>
      }
    </>)
}
Page.propTypes = {
  children: node.isRequired
}

export default Page
