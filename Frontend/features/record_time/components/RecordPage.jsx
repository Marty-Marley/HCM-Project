import React, { Component } from 'react'
import Head from 'next/head'
import { withStyles } from '@material-ui/core/styles'
import {
  Paper, Typography, Card, CardContent
} from '@material-ui/core'
import TimeManagementTable from './TimeManagementTable'

const styles = theme => ({
  card: {
    maxWidth: '250px',
    marginTop: '24px',
  },
  content: {
    paddingBottom: '16px !important'
  },
})

class RecordPage extends Component {
  state = {

  }

  render() {
    const { classes } = this.props
    return (
      <>
        <Head>
          <title>Record time</title>
        </Head>
        <Typography variant="h3" component="h3" color="secondary">
          Time Management
        </Typography>
        <Card className={classes.card}>
          <CardContent className={classes.content}>
            <Typography variant="body1" component="h4" gutterBottom>
              {`Holiday Time Remaining: ${10}`}
            </Typography>
            <Typography variant="body1" component="h4">
              {`Holiday Time Taken: ${10}`}
            </Typography>
          </CardContent>
        </Card>
        <TimeManagementTable />
      </>
    )
  }
}

export default withStyles(styles)(RecordPage)
