import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid, Button } from '@material-ui/core'
import Router from 'next/router'
import Head from 'next/head'
import { Query } from 'react-apollo'
import { withSnackbar } from 'notistack'
import FeatureCard from './FeatureCard'
import WelcomeBanner from './WelcomeBanner'
import { CURRENT_USER_QUERY } from '../graphql'

const styles = theme => ({
  root: {
    flexGrow: 1,
  }
});

/**
 * * Dashboard comoponent that provdies a grid for cards.
 */

class DashboardPage extends Component {
  state = {
  }

  summonSnackbar = (message, variant, position, linger = null) => {
    const { enqueueSnackbar } = this.props
    enqueueSnackbar(message, {
      variant,
      action: (
        <Button>
          Dismiss
        </Button>
      ),
      anchorOrigin: position,
      autoHideDuration: linger
    })
  }


  render() {
    const { classes } = this.props
    return (
      <Query
        query={CURRENT_USER_QUERY}
        fetchPolicy="cache-and-network"
        onCompleted={(data) => {
          const { currentUser } = data
          const { hasSubmitted } = currentUser.timeInfo.weeks[0]
          if (currentUser.requiresAction && !hasSubmitted) {
            this.summonSnackbar(
              'Your manager has requested your timesheet to be completed',
              'warning',
              {
                vertical: 'top',
                horizontal: 'center',
              },
              5000
            )
          }
        }}
      >
        {({ data, error }) => {
          if (error) {
            if (error.message === 'GraphQL error: Please log in to do that!') Router.push('/login')
            return null
          }
          if (data.currentUser) {
            return (
              <div className={classes.root}>
                <Head>
                  <title>Dashboard</title>
                </Head>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <WelcomeBanner currentUser={data.currentUser} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FeatureCard currentUser={data.currentUser} />
                  </Grid>
                </Grid>
              </div>
            )
          }
          return null
        }

        }
      </Query>
    )
  }
}


DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(
  withSnackbar(DashboardPage),
)
