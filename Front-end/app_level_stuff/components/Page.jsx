import React, { Component } from 'react'
import Nprogress from 'nprogress'
import Router from 'next/router'
import styled, { ThemeProvider, injectGlobal } from 'styled-components'
import Nav from './Nav'
import Meta from './Meta'

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

export default class Page extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <>
          <Meta />
          <Nav />
          {this.props.children}
        </>
      </ThemeProvider>
    )
  }
}
