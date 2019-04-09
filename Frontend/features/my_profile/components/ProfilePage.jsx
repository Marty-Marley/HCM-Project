import React, { Component } from 'react'
import Head from 'next/head'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'
import { Grid, Paper, Typography } from '@material-ui/core'
import Router from 'next/router'
import Sidebar from './Sidebar'
import MainContent from './MainContent';
import { profilePageStyles as styles } from '../styles'
import { CURRENT_USER_QUERY } from '../graphql'

class ProfilePage extends Component {
  render() {
    const { classes } = this.props
    return (
      <>
        <Head>
          <title>My profile</title>
          <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBA2ylfU82_oPeb8JTOjOhUQQwyQizDUUc&libraries=places" />
        </Head>
        <Query
          query={CURRENT_USER_QUERY}
        >
          {({ data, loading, error }) => {
            if (loading) return <p>Loading...</p>
            return (
              <>
                <Typography variant="h3" component="h3" color="secondary">
                  My Profile
            </Typography>
                <Grid
                  container
                  direction="row"
                  justify="center"
                  alignItems="center"
                  spacing={16}
                  className={classes.root}
                >
                  <Grid item xs={12} sm={4}>
                    <Paper className={classes.paper} elevation={10}>
                      <Sidebar currentUser={data.currentUser} />
                    </Paper>
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Paper className={classes.paper} elevation={10}>
                      <MainContent currentUser={data.currentUser} />
                    </Paper>
                  </Grid>
                </Grid>
              </>
            )
          }}
        </Query>
      </>
    )
  }
}

export default withStyles(styles)(ProfilePage)
