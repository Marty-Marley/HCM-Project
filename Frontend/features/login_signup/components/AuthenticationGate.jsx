import { Query } from 'react-apollo'
import { node } from 'prop-types'
import { CURRENT_USER_QUERY } from '../../../app/components/User'

/**
 * Login functional component for LoginGate
 * If the user is not logged in, show the login page
 * otherwise show the page they want to access.
 */
const AuthenticationGate = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      // console.log(data.currentUser.permissions[0])
      console.log(props.children.type.__route)
      if (loading) return <p>Loading...</p>
      if (props.children.type.__route === '/team' && data.currentUser.permissions[0] !== 'MANAGER') {
        return <p>123</p>
      }
      return props.children
    }}
  </Query>
)

AuthenticationGate.propTypes = {
  children: node.isRequired
}

export default AuthenticationGate
