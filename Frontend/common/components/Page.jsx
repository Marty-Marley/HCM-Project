import React, { Component } from 'react'
import { node } from 'prop-types'
import Nprogress from 'nprogress'
import Router from 'next/router'
import { UserAgent } from '@quentin-sommer/react-useragent'
import Nav from './Nav'
import Meta from './Meta'
import LoginGate from '../../features/login_signup/components/LoginGate'
import MobileNav from './MobileNav'

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
 * Class component for wrapping all page componens in Nav, loginGate and themeProvider.
 */
class Page extends Component {
  state = {
    isClient: false
  }

  render() {
    const { route, children } = this.props
    const byPassPage = route === '/login'
    return (
      <>
        <Meta />
        {!byPassPage
          ? <>
            <UserAgent computer>
              <Nav />
            </UserAgent>

            <div style={{ padding: '25px', marginBottom: '56px' }}>
              {children}
            </div>
            <UserAgent mobile>
              <MobileNav />
            </UserAgent>

          </>
          : <>{children}</>
        }
      </>
    )
  }
}


Page.propTypes = {
  children: node.isRequired
}

export default Page
