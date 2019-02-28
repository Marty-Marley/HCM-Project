import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Dashboard from '@material-ui/icons/Dashboard'
import ExitToApp from '@material-ui/icons/ExitToApp'
import Router from 'next/router'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import Button from '@material-ui/core/Button'
import { Mutation } from 'react-apollo'

import Modal from './Modal'
import { CURRENT_USER_QUERY } from './User'
import { SIGN_OUT_MUTATION } from '../../features/login_signup/components/Signout'

const styles = {
  root: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    borderTop: '0.02px solid #dddddd'
  },
}

class MobileNav extends React.Component {
  state = {
    value: 0,
    showModal: false
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  toggleModal = () => {
    const { showModal } = this.state
    this.setState({ showModal: !showModal })
  }

  render() {
    const { classes } = this.props
    const { value } = this.state

    return (
      <Mutation mutation={SIGN_OUT_MUTATION} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
        {signout => (
          <>
            <BottomNavigation
              value={value}
              onChange={this.handleChange}
              showLabels
              className={classes.root}
            >
              <BottomNavigationAction label="Back" icon={<ArrowBack />} onClick={() => Router.back()} />
              <BottomNavigationAction label="Dashboard" icon={<Dashboard />} onClick={() => Router.push('/')} />
              <BottomNavigationAction label="Signout" icon={<ExitToApp />} onClick={() => this.toggleModal()} />
            </BottomNavigation>
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
        )}
      </Mutation>
    )
  }
}

MobileNav.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MobileNav)
