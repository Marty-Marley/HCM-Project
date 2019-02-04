import React, { Component } from 'react'
import {
  shape, string, node
} from 'prop-types'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'
import { permissions } from '../utils'

const EDIT_PERMISSIONS_MUTATION = gql`
  mutation editPermissions($permissions: [Permissions], $userId: ID!) {
    editPermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      name
      email
    }
  }
`

class User extends Component {
  static propTypes = {
    user: shape({
      avatar: string,
      name: string,
      role: string,
      permissions: node
    }).isRequired
  }

  state = {
    userPermissions: this.props.user.permissions
  }

  handlePermissionChange = (e) => {
    const checkbox = e.target
    const { userPermissions } = this.state
    let updatedPermissions = [...userPermissions]
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value)
    } else {
      updatedPermissions = updatedPermissions.filter(permission => permission !== checkbox.value)
    }
    this.setState({ userPermissions: updatedPermissions })
  }

  render() {
    const { user } = this.props
    const { userPermissions } = this.state
    return (
      <Mutation mutation={EDIT_PERMISSIONS_MUTATION} variables={{ permissions: userPermissions, userId: user.id }}>
        {(editPermissions, { loading }) => (
          <tr key={user.id}>
            <td>Image</td>
            <td>{user.name}</td>
            <td>Role</td>
            {permissions.map(permission => (
              <td key={permission}>
                <input type="checkbox" checked={userPermissions.includes(permission)} value={permission} onChange={this.handlePermissionChange} />
              </td>))}
            <td><button type="button" onClick={editPermissions} disabled={loading}>{`Updat${loading ? 'ing' : 'e'}`}</button></td>
          </tr>
        )}
      </Mutation>
    )
  }
}

export default User
