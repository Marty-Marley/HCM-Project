import App, { Container } from 'next/app'
import Page from '../app_level_stuff/components/Page'

export default class MyApp extends App {
  render() {
    const { Component } = this.props
    return (
      <Container>
        <Page>
          <Component />
        </Page>
      </Container>
    )
  }
}
