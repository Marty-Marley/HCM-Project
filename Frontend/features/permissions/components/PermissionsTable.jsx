import {
  arrayOf, shape, string, node
} from 'prop-types'
import { permissions } from '../utils'
import User from './User'

const PermissionsTable = ({ users }) => (
  <table>
    <tbody>
      <tr>
        <th>Avatar</th>
        <th>Name</th>
        <th>Role</th>
        {permissions.map(permission => <th key={permission}>{permission}</th>)}
      </tr>
      {users.map(user => <User key={user.id} user={user} />)}
    </tbody>
  </table>
)

PermissionsTable.propTypes = {
  users: arrayOf(shape({
    avatar: string,
    name: string,
    role: string,
    permissions: node
  })).isRequired
}

export default PermissionsTable
