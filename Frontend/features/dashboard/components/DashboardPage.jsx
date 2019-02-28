import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Router from 'next/router'
import Head from 'next/head'
import User from '../../../common/components/User'
import FeatureCard from './FeatureCard'
import WelcomeBanner from './WelcomeBanner'

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

  render() {
    const { classes } = this.props
    return (
      <User>
        {({ data, error }) => {
          if (error) {
            Router.push('/login')
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
      </User>
    )
  }
}


DashboardPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DashboardPage);
