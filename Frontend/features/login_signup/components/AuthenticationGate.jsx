import { Query } from 'react-apollo'
import { node } from 'prop-types'
import { CURRENT_USER_QUERY } from '../../../common/components/User'

const AuthenticationGate = props => (
  <Query query={CURRENT_USER_QUERY}>
    {({ data, loading }) => {
      console.log(data.currentUser.permissions[0])
      console.log(props.children)
      if (loading) return <p>Loading...</p>
      if (props.children.type.__route === '/team' && data.currentUser.permissions[0] !== 'MANAGER') {
        return <p>Not authorised</p>
      }
      return props.children
    }}
  </Query>
)

AuthenticationGate.propTypes = {
  children: node.isRequired
}

export default AuthenticationGate
