import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { yogaEndpoint, prodYogaEndpoint } from '../../config'

/**
 * HOC for wrapping apollo for state management
 */
export default withApollo(({ headers }) => (
  new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? yogaEndpoint : prodYogaEndpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include',
          rejectUnauthorized: false
        },
        headers
      })
    }
  })
))
