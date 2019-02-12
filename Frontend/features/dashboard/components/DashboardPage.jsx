import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import { Grid } from '@material-ui/core'
import Router from 'next/router'
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
    isLoggedIn: false
  }

  render() {
    const { classes } = this.props
    return (
      <User>
        {({ data, error }) => {
          if (error) {
            console.log(error.message)
            Router.push('/login')
            return null
          }
          if (data.currentUser) {
            return (
              <div className={classes.root}>
                <Grid container spacing={24}>
                  <Grid item xs={12}>
                    <WelcomeBanner currentUser={data.currentUser} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FeatureCard currentUser={data.currentUser} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FeatureCard currentUser={data.currentUser} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FeatureCard currentUser={data.currentUser} />
                  </Grid>
                </Grid>
              </div>
            )
          }
          return <p>asd</p>
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
