import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { withStyles } from '@material-ui/core/styles'
import {
  Menu, MenuItem, Button, Avatar
} from '@material-ui/core'
import Router from 'next/router'
import Home from '@material-ui/icons/Home'
import { withSnackbar } from 'notistack'
import { ALL_USERS_QUERY } from '../graphql'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
  avatar: {
    margin: 16,
    marginRight: '20px',
  },
  addButton: {
    float: 'right',
    backgroundColor: theme.palette.green.light,
    marginBottom: '24px',
    '&:hover': {
      backgroundColor: theme.palette.green.dark
    },
  }
})

class AddMemberMenu extends Component {
  state = {
    anchorEl: null,
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  summonSnackbar = (message, variant, position, linger = null) => {
    const { enqueueSnackbar } = this.props
    enqueueSnackbar(message, {
      variant,
      action: (
        <Button onClick={() => {
          Router.push('/')
        }}>
          <Home />
        </Button>
      ),
      anchorOrigin: position,
      autoHideDuration: linger
    })
  }

  render() {
    const {
      classes, addMember, updateState, currentTeam,
    } = this.props
    const { anchorEl } = this.state
    return (
      <Query
        query={ALL_USERS_QUERY}
        variables={{ ids: currentTeam }}
        onError={(e) => {
          this.summonSnackbar(
            e.message.replace('GraphQL error: ', ''),
            'warning',
            {
              vertical: 'top',
              horizontal: 'center',
            },
            3000
          )
        }}
      >
        {({ data, loading }) => {
          if (loading) return <p>Loading...</p>
          if (data) {
            return (
              <div>
                <Button
                  aria-owns={anchorEl ? 'add-menu' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                  className={classes.addButton}
                  disabled={data.users && data.users.length < 1}
                >
                  {data.users && data.users.length >= 1 ? 'Add to team' : 'No one else to add'}
                </Button>
                <Menu
                  id="add-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  {data.users.map((user) => {
                    const fullName = `${user.firstName} ${user.lastName}`
                    return (
                      <MenuItem key={user.id} value={fullName} onClick={() => {
                        updateState('mostRecentlyAdded', fullName)
                        addMember.addToTeam({ variables: { id: user.id } })
                        this.handleClose()
                      }}>
                        <Avatar alt={fullName} src={user.avatar} className={classes.avatar} />
                        {fullName}
                      </MenuItem>
                    )
                  })}
                </Menu>
              </div>
            )
          }
          return null
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(
  withSnackbar(AddMemberMenu),
)
