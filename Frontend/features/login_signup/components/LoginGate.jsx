import { Query } from 'react-apollo'
import { node } from 'prop-types'
import { CURRENT_USER_QUERY } from '../../../app/components/User'
import LoginContainer from './LoginContainer'

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
