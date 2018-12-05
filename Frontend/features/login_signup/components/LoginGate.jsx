import { Query } from 'react-apollo'
import { node } from 'prop-types'
import { CURRENT_USER_QUERY } from '../../../app/components/User'
import LoginContainer from './LoginContainer'

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
        return <LoginContainer />
      }
      return props.children
    }}
  </Query>
)

LoginGate.propTypes = {
  children: node.isRequired
}

export default LoginGate