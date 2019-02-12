import { Query } from 'react-apollo'
import { node, object } from 'prop-types'
import Router from 'next/router'
import { CURRENT_USER_QUERY } from '../../../common/components/User'
import LoginPage from './LoginPage'

/**
 * Login functional component for LoginGate
 * If the user is not logged in, show the login page
 * otherwise show the page they want to access.
 */
const LoginGate = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      if (loading) return <p>Loading...</p>
      if (!data.currentUser) {
        return <LoginPage />
      }
      return props.children
    }}
  </Query>
)

LoginGate.propTypes = {
  children: node.isRequired
}

export default LoginGate
