import {
  arrayOf, shape, string, node, object
} from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import {
  Table, TableBody, TableCell, TableHead, TableRow, Paper,
} from '@material-ui/core';
import { permissions } from '../utils'
import User from './User'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  tHead: {
    fontWeight: 'bold',
    backgroundColor: '#dadada'
  }
})

const PermissionsTable = ({ users, classes }) => (
  <Paper className={classes.root}>
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Avatar</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Role</TableCell>
          {permissions.map(permission => <TableCell className={classes.tHead} key={permission}>{permission}</TableCell>)}
          <TableCell align="center">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map(user => <User key={user.id} user={user} />)}
      </TableBody>
    </Table>
  </Paper >
)

PermissionsTable.propTypes = {
  users: arrayOf(shape({
    avatar: string,
    name: string,
    role: string,
    permissions: node
  })).isRequired
}

PermissionsTable.propTypes = {
  classes: object.isRequired,
}

export default withStyles(styles)(PermissionsTable)
