import React, { Component } from 'react'
import Head from 'next/head'
import { withStyles } from '@material-ui/core/styles'
import {
  Paper, Typography, Card, CardContent, Button, Grid
} from '@material-ui/core'
import { Query } from 'react-apollo'
import { CURRENT_USER_TIMESHEET_QUERY } from '../graphql/index'
import TimeManagementTable from './TimeManagementTable'
import TimeCard from './TimeCard'

const styles = theme => ({
  hours: {
    maxWidth: '250px',
    marginTop: '24px',
  },
  chart: {
    maxWidth: '500px',
    marginTop: '24px',
  },
  content: {
    paddingBottom: '16px !important'
  },
  submit: {
    marginTop: '16px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    float: 'right',
    '&:hover': {
      backgroundColor: '#1853ac'
    }
  }
})

class RecordPage extends Component {
  state = {

  }

  render() {
    const { classes } = this.props
    return (
      <Query query={CURRENT_USER_TIMESHEET_QUERY}>
        {({ data: { currentUser }, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>{error.message}</p>
          return (
            <>
              <Head>
                <title>Record time</title>
              </Head>
              <Typography variant="h3" component="h3" color="secondary">
                Time Management
              </Typography>
              <TimeCard classes={classes} currentUser={currentUser} />
              <TimeManagementTable currentUser={currentUser} />
            </>)
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(RecordPage)
