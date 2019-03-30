import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Button } from '@material-ui/core'
import LoginForm from './LoginForm'
import Signup from './Signup'

// TODO If logged in - redirect to dashboard

/**
 * ? Royalty free image: https://unsplash.com/photos/VW8MUbHyxCU
 */

const styles = theme => ({
  root: {
    backgroundImage: 'url("https://images.unsplash.com/photo-1470219556762-1771e7f9427d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80")',
    height: '-webkit-fill-available',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    [theme.breakpoints.down('xs')]: {
      overflow: 'hidden'
    },
  },
  formBackground: {
    position: 'absolute',
    height: 'inherit',
    width: '450px',
    backgroundColor: 'hsla(0, 0%, 100%, 0.57)',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      overflow: 'hidden'
    },
  },
  createAccountButton: {
    position: 'absolute',
    left: '50%',
    bottom: '20px',
    transform: 'translate(-50%, -50%)',
    margin: '0 auto',
  }
})

/**
 * Login class component for displaying login and tabbing to signup
 */
class LoginPage extends Component {
  state = {
    signup: false
  }

  /**
   * Toggles signup flag for signin/up tabbing
   */
  toggleLogin = () => {
    const { signup } = this.state
    this.setState({ signup: !signup })
  }

  render() {
    const { signup } = this.state
    const { classes } = this.props
    return (
      <div className={classes.root}>
        <div className={classes.formBackground}>
          {signup ? <Signup /> : <LoginForm />}
          <div className={classes.createAccountButton}>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Button type="button" onClick={this.toggleLogin}>{!signup ? 'Create Account' : 'Sign in'}</Button>
            </Grid>
          </div>
        </div>
      </div>
    )
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(LoginPage);
