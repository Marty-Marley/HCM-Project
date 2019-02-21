import React, { Component } from 'react'
import {
  shape, string, node, object
} from 'prop-types'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles';
import {
  TableCell, TableRow, Checkbox, Button, Avatar
} from '@material-ui/core';
import UpdateIcon from '@material-ui/icons/Update';
import { withSnackbar } from 'notistack'
import { Mutation } from 'react-apollo'
import { permissions } from '../utils'

// TODO - Wes Bos has video on making whole checkbox cell clickable

const styles = theme => ({
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  avatar: {
    margin: 10,
    width: 60,
    height: 60,
  },
  updateButton: {
    paddingRight: '10px'
  }
})

const EDIT_PERMISSIONS_MUTATION = gql`
  mutation editPermissions($permissions: [Permissions], $userId: ID!) {
    editPermissions(permissions: $permissions, userId: $userId) {
      id
      permissions
      firstName
      lastName
      email
    }
  }
`

class User extends Component {
  static propTypes = {
    user: shape({
      avatar: string,
      firstName: string,
      lastName: string,
      role: string,
      permissions: node
    }).isRequired
  }

  // TODO Try and get this independant of state
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

  summonSnackbar = (fullName) => {
    this.props.enqueueSnackbar(`${fullName}'s permissions have been updated.`, {
      variant: 'success',
      action: (
        <Button size="small">Dismiss</Button>
      ),
      anchorOrigin: {
        vertical: 'top',
        horizontal: 'right',
      }
    })
  }

  render() {
    const { user, classes } = this.props
    const { userPermissions } = this.state
    // Destructuring role out of user + destructuring the first element out of role array - into userRole
    const { role: [userRole] } = user
    return (
      <Mutation
        mutation={EDIT_PERMISSIONS_MUTATION}
        variables={{ permissions: userPermissions, userId: user.id }}
        onCompleted={({ editPermissions }) => {
          const fullName = `${editPermissions.firstName} ${editPermissions.lastName}`
          this.summonSnackbar(fullName)
        }}
      >
        {(editPermissions, { loading }) => (
          <TableRow key={user.id}>
            <TableCell><Avatar alt={user.firstName} src={user.avatar} className={classes.avatar} /></TableCell>
            <TableCell>{user.firstName}</TableCell>
            <TableCell>{user.lastName}</TableCell>
            <TableCell>{userRole.replace('_', ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())}</TableCell>
            {permissions.map(permission => (
              <TableCell key={permission}>
                <Checkbox color="primary" checked={userPermissions.includes(permission)} value={permission} onChange={this.handlePermissionChange} />
              </TableCell>))}
            <TableCell align="center"><Button fullWidth size="large" className={classes.updateButton} variant="contained" color="primary" onClick={() => editPermissions()} disabled={loading}>{`Updat${loading ? 'ing' : 'e'}`}<UpdateIcon className={classes.rightIcon} /></Button></TableCell>
          </TableRow>
        )}
      </Mutation>
    )
  }
}

User.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(
  withSnackbar(User),
)
