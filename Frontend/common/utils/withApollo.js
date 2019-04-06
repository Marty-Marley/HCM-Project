import withApollo from 'next-with-apollo'
// import ApolloClient from 'apollo-boost'
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { yogaEndpoint, prodYogaEndpoint } from '../../config'

/**
 * HOC for wrapping apollo for state management
 */
export default withApollo(({ headers }) => (
  new ApolloClient({
    ssrMode: true,
    // uri: process.env.NODE_ENV === 'development' ? yogaEndpoint : prodYogaEndpoint,
    // request: (operation) => {
    //   operation.setContext({
    //     fetchOptions: {
    //       credentials: 'include'
    //     },
    //     headers
    //   })
    // }
    link: createHttpLink({
      uri: process.env.NODE_ENV === 'development' ? yogaEndpoint : prodYogaEndpoint,
      credentials: 'include',
      headers
    }),
    cache: new InMemoryCache()
  })
))
