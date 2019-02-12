import React from 'react'
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ExitToApp from '@material-ui/icons/ExitToApp';

import { CURRENT_USER_QUERY } from '../../../common/components/User'

/**
 * Signout mutation that will cause the client-side cookies to be cleared
 * This will log the user out
 */
const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

/**
 * Signout functional component which causes fires the logout functionality
 * and routes to the login page.
 */
const Signout = (props) => {
  const { classes } = props
  return (
    <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {signout => (
        <Button className={classes.button} onClick={() => {
          Router.push('/login')
          signout()
        }}
        >
          Sign out
          <ExitToApp className={classes.rightIcon} />
        </Button>
      )}
    </Mutation>)
}

Signout.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signout);
