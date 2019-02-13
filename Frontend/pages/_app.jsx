import React from 'react'
import App, { Container } from 'next/app'
import { ApolloProvider } from 'react-apollo'
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import { SnackbarProvider } from 'notistack';
import getPageContext from '../common/utils/getPageContext';
import Page from '../common/components/Page'
import withApollo from '../common/utils/withApollo'

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
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    pageProps.query = ctx.query
    return { pageProps }
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
              <Page route={this.props.router.route}>
                <SnackbarProvider maxSnack={5}>
                  <Component pageContext={this.pageContext} {...pageProps} />
                </SnackbarProvider>
              </Page>
            </MuiThemeProvider>
          </JssProvider>
        </ApolloProvider>
      </Container>
    )
  }
}

export default withApollo(MyApp)
