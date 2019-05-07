import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { MuiThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import JssProvider from 'react-jss/lib/JssProvider';
import { SnackbarProvider } from 'notistack'
import { UserAgentProvider } from '@quentin-sommer/react-useragent'
import getPageContext from '../common/utils/getPageContext'
import Page from '../common/components/Page'
import withApollo from '../common/utils/withApollo'
import { CURRENT_USER_QUERY } from '../common/components/User'
import redirect from '../common/utils/redirect'

/**
 * Wraps each page in apollo provider for state management.
 */
class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  /**
   ** getInitialProps will fire before the render so anything that
   ** is returned will be available within the render
   */
  static async getInitialProps(res) {
    let pageProps = {}
    if (res.Component.getInitialProps) {
      pageProps = await res.Component.getInitialProps(res.ctx)
    }
    pageProps.query = res.ctx.query

    //* Get current user info
    const response = await res.ctx.apolloClient.query({ query: CURRENT_USER_QUERY, fetchPolicy: 'network-only', errorPolicy: 'ignore' })
    //* If currentUser response isnt authenticated - bring to login page
    if ((!response || !response.data || !response.data.currentUser) && res.ctx.pathname !== '/login') {
      redirect(res.ctx, '/login')
    }

    return {
      ua: res.ctx.req
        ? res.ctx.req.headers['user-agent']
        : navigator.userAgent,
      pageProps
    }
  }

  render() {
    const { Component, apollo, pageProps } = this.props
    return (
      <Container>
        <ApolloProvider client={apollo}>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              <CssBaseline />
              <UserAgentProvider ua={this.props.ua}>
                <Page route={this.props.router.route}>
                  <SnackbarProvider maxSnack={5}>
                    <Component pageContext={this.pageContext} {...pageProps} />
                  </SnackbarProvider>
                </Page>
              </UserAgentProvider>
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
      </Container >
    )
  }
}

export default withApollo(MyApp)
