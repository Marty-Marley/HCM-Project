import React from 'react'
import Head from 'next/head'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'
import { Grid, Paper, Typography } from '@material-ui/core'
import Router from 'next/router'
import Sidebar from './Sidebar'
import MainContent from './MainContent';
import { profilePageStyles as styles } from '../styles'
import { CURRENT_USER_QUERY } from '../graphql'

const ProfliePage = ({ classes }) => (
  <>
    <Head>
      <title>My profile</title>
    </Head>
    <Query
      query={CURRENT_USER_QUERY}
    >
      {({ data, loading, error }) => {
        if (loading) return <p>Loading...</p>
        if (error) {
          if (error.message === 'Please log in to do that!') Router.push('/login')
          return null
        }
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

export default withStyles(styles)(ProfliePage)
