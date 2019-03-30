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

// TODO - Prevent empty user being created on signup

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
      paddingTop: '82px',
    },
  },
  title: {
    marginBottom: '35px'
  }
})

/**
 * Mutation for taking posting user signup data to server.
 */
const CREATE_USER_MUTATION = gql`
  mutation CREATE_USER_MUTATION($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    createUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      id
      email
      firstName
      lastName
    }
  } 
`
/**
 * Signup form for retreiving user input data for signing up
 */
class Signup extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value })
  }

  render() {
    const {
      email, password, firstName, lastName
    } = this.state
    const { classes } = this.props
    return (
      <Mutation
        mutation={CREATE_USER_MUTATION}
        variables={this.state}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {(createUser, { loading, error }) => (
          <form method="post" onSubmit={async (e) => {
            e.preventDefault()
            await createUser()
            this.setState({
              email: '', password: '', firstName: '', lastName: ''
            })
            Router.push('/')
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
                    Sign up
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
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    inputProps={{
                      pattern: '(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}',
                      title: 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters'
                    }}
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
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-firstName-input"
                    label="First Name"
                    className={classes.textField}
                    type="text"
                    autoComplete="firstName"
                    margin="normal"
                    variant="outlined"
                    name="firstName"
                    value={firstName}
                    onChange={this.handleInput}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-lastName-input"
                    label="Last Name"
                    className={classes.textField}
                    type="text"
                    autoComplete="lastName"
                    margin="normal"
                    variant="outlined"
                    name="lastName"
                    value={lastName}
                    onChange={this.handleInput}
                    required
                  />
                </Grid>
                <Grid item xs={12}><Button variant="contained" color="primary" type="submit">Sign Up</Button></Grid>
              </Grid>
            </fieldset>
          </form>
        )}
      </Mutation>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signup);
