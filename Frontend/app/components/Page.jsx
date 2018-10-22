import React, { Component } from 'react'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import { node } from 'prop-types'
import Nprogress from 'nprogress'
import Router from 'next/router'
import Nav from './Nav'
import Meta from './Meta'
import LoginGate from '../../features/login_signup/components/LoginGate'

Router.onRouteChangeStart = () => {
  Nprogress.start()
}
Router.onRouteChangeComplete = () => {
  Nprogress.done()
}
Router.onRouteChangeError = () => {
  Nprogress.done()
}

// TODO - Come up with some theme
const theme = {
  green: '#1e8423',
  black: '#252625',
}

injectGlobal`
  // TODO - Consider custom fonts
  /* @font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2') format('woff2');
    font-weight: normal;
    font-style: normal;
  } */
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    /* font-family: 'radnika_next'; */
  }
  a {
    text-decoration: none;
    color: ${theme.green};
  }
`
const Page = ({ children }) => (
  <ThemeProvider theme={theme}>
    <>
      <Meta />
      <LoginGate>
        <Nav />
        {children}
      </LoginGate>
    </>
  </ThemeProvider>
)
Page.propTypes = {
  children: node.isRequired
}

export default Page
