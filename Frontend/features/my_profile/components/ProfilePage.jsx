import React from 'react'
import Head from 'next/head'
import { withStyles } from '@material-ui/core/styles'
import { Query } from 'react-apollo'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
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
      {({ data, error }) => {
        console.log(data)
        return (
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="center"
            spacing={16}
            className={classes.root}
          >
            <Grid item xs={4}>
              <Paper className={classes.paper} elevation={1}>
                <Sidebar currentUser={data.currentUser} />
              </Paper>
            </Grid>
            <Grid item xs={8}>
              <Paper className={classes.paper} elevation={1}>
                <MainContent currentUser={data.currentUser} />
              </Paper>
            </Grid>
          </Grid>
        )
      }}
    </Query>
  </>
)

export default withStyles(styles)(ProfliePage)
