import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import ExitToApp from '@material-ui/icons/ExitToApp'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import { CURRENT_USER_QUERY } from '../../../common/components/User'
import Modal from '../../../common/components/Modal'

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
})

/**
 * Signout class based component which causes fires the logout functionality
 * and routes to the login page.
 */

class Signout extends Component {
  state = {
    showModal: false
  }

  toggleModal = () => {
    const { showModal } = this.state
    this.setState({ showModal: !showModal })
  }

  render() {
    const { classes } = this.props
    return (
      <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {signout => (
          <>
            <Button className={classes.button} onClick={() => {
              this.toggleModal()
            }}
            >
              Sign out
            <ExitToApp className={classes.rightIcon} />
            </Button>
            <Modal
              open={this.state.showModal}
              onClose={this.toggleModal}
              title="Log out"
            >
              <DialogContent>
                <DialogContentText>
                  Are you sure you want to log out?
              </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button variant="contained" onClick={this.toggleModal}>
                  No
                </Button>
                <Button variant="contained" color="primary" onClick={() => {
                  Router.push('/login')
                  signout()
                }}>
                  Yes
                </Button>
              </DialogActions>
            </Modal>
          </>
        )
        }
      </Mutation>
    )
  }
}


Signout.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Signout)
export { SIGN_OUT_MUTATION }
