import React, { Component } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types';
import Router from 'next/router'
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import User from './User'
import Signout from '../../features/login_signup/components/Signout'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  nav: {
    backgroundColor: theme.palette.secondary.main
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
  },
  a: {
    color: theme.link,
    textDecoration: 'none'
  }
});

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
            <Typography variant="h6" color="inherit" className={classes.grow}>
              HCM
            </Typography>
            <Typography variant="h6" className={classes.grow}>
              <Link href="/">
                <a className={classes.a}>Dashboard</a>
              </Link>
            </Typography>
            <User>
              {({ data: { currentUser } }) => (
                <div>
                  <IconButton
                    aria-owns={open ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                  >
                    <AccountCircle />
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
                    {currentUser
                      && <Signout />
                    }
                  </Menu>
                </div>
              )}
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
