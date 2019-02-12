import React, { Component } from 'react'
import PropTypes from 'prop-types';
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Button, TextField
} from '@material-ui/core'
import { CURRENT_USER_QUERY } from '../../../common/components/User'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  fieldset: {
    border: '0',
    paddingTop: '260px',
    [theme.breakpoints.down('xs')]: {
      paddingTop: '120px',
    },
  },
  title: {
    marginBottom: '35px'
  }
})

/**
 * Signin mutation which receives sigin in data to be sent to server
 */
const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  } 
`
/**
 * Login class component which facilitates the retrieval of user input data from login,
 */
class LoginForm extends Component {
  state = {
    email: '',
    password: '',
  }

  /**
   * Reusable function for assigning input data to state.
   */
  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  render() {
    const {
      email, password
    } = this.state
    const { classes } = this.props
    return (
      <Mutation
        mutation={SIGNIN_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(signin, { error, loading }) => (
          <form method="post" onSubmit={async (e) => {
            e.preventDefault()
            await signin()
            this.setState({
              email: '', password: ''
            })
            if (Router.route === '/login') {
              Router.push('/')
            }
          }}>
            <fieldset disabled={loading} className={classes.fieldset}>
              {error && <p style={{ color: 'red' }}>{error.message.replace('GraphQL error: ', '')}</p>}
              <Grid
                container
                spacing={24}
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} className={classes.title}>
                  <Typography component="h2" variant="h2">
                    Sign in
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-email-input"
                    label="Email"
                    className={classes.textField}
                    type="email"
                    name="email"
                    autoComplete="email"
                    margin="normal"
                    variant="outlined"
                    value={email}
                    onChange={this.handleInput}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-password-input"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    autoComplete="current-password"
                    margin="normal"
                    variant="outlined"
                    name="password"
                    value={password}
                    onChange={this.handleInput}
                  />
                </Grid>
                <Grid item xs={12}><Button variant="contained" color="primary" type="submit">Sign in</Button></Grid>
              </Grid>
            </fieldset>
          </form>
        )}
      </Mutation>
    )
  }
}

LoginForm.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);
