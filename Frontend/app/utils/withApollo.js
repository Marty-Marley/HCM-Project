import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { yogaEndpoint } from '../../config'

export default withApollo(({ headers }) => (
  new ApolloClient({
  // TODO Will need to change the uri in production
    uri: yogaEndpoint,
    request: (operation) => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      })
    }
  })
))
