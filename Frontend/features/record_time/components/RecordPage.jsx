import React, { Component } from 'react'
import Head from 'next/head'
import { withStyles } from '@material-ui/core/styles'
import {
  Paper, Typography, Card, CardContent, Button, Grid
} from '@material-ui/core'
import { Query } from 'react-apollo'
import Router from 'next/router'
import { CURRENT_USER_TIMESHEET_QUERY } from '../graphql/index'
import TimeManagementTable from './TimeManagementTable'
import TimeCard from './TimeCard'

const styles = theme => ({
  title: {
    marginBottom: '67px',
  },
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
    marginTop: '10px',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    float: 'right',
    '&:hover': {
      backgroundColor: '#1853ac'
    }
  },
  times: {
    marginTop: '8px'
  }

})

class RecordPage extends Component {
  state = {

  }

  render() {
    const { classes } = this.props
    return (
      <Query query={CURRENT_USER_TIMESHEET_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          return (
            <>
              <Head>
                <title>Record time</title>
              </Head>
              <Typography variant="h3" component="h3" color="secondary" className={classes.title}>
                Time Management
              </Typography>
              <TimeManagementTable currentUser={data.currentUser} />
              <TimeCard classes={classes} currentUser={data.currentUser} />
            </>
          )
        }}
      </Query>
    )
  }
}

export default withStyles(styles)(RecordPage)
