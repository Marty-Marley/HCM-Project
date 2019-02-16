import React, { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import Router from 'next/router'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Avatar from '@material-ui/core/Avatar'
import User from './User'
import Signout from '../../features/login_signup/components/Signout'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: 'transparent',
    boxShadow: 'none'

  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    margin: theme.spacing.unit,
    padding: '0px'
  },
  a: {
    color: theme.palette.secondary.main,
    textDecoration: 'none',
    '&:hover': {
      color: '#a9ccff'
    }
  },
  icon: {
    paddingLeft: '24px',
    // borderLeft: '1.3px solid #dcdcdc'
  },
  bigAvatar: {
    margin: 10,
  },
});

// TODO Add current date/time to nav - Moment.js?

/**
 * Class based component for displaying the nav bar
 * Only display the sign out button if a user is logged in.
 */
class Nav extends Component {
  state = {
    anchorEl: null,
  };


  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  routeTo = (route) => {
    Router.push(route)
  }

  render() {
    const { classes } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className={classes.root}>
        <AppBar position="static" className={classes.nav}>
          <Toolbar>
            <Typography variant="h6" color="secondary" className={classes.grow}>
              HCM
            </Typography>
            <Typography variant="h6" className={classes.grow}>
              <Link href="/">
                <a className={classes.a}>Dashboard</a>
              </Link>
            </Typography>
            <User>
              {({ data, error }) => {
                if (error) return <p>{error.message}</p>
                return (<div className={classes.icon}>
                  <IconButton
                    className={classes.button}
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="default"
                  >
                    {data.currentUser
                      && <Avatar
                        alt={data.currentUser.firstName}
                        src={data.currentUser.avatar}
                        className={classes.bigAvatar}
                      />
                    }

                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                  >
                    <MenuItem onClick={() => {
                      this.routeTo('/my_profile')
                      this.handleClose()
                    }}>
                      My Profile
                    </MenuItem>
                    {data.currentUser
                      && <Signout />
                    }
                  </Menu>
                </div>)
              }}
            </User>
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Nav)
