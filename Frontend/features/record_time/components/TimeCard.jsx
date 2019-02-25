import React from 'react'
import {
  Paper, Typography, Card, CardContent, Button, Grid
} from '@material-ui/core'
import TimeChart from './TimeChart'

const TimeCard = ({ classes, currentUser }) => {
  const { timeRemaining, timeTaken } = currentUser.timeInfo

  const data = {
    labels: [
      'Working',
      'PTO',
    ],
    datasets: [{
      data: [timeRemaining, timeTaken],
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
      ],
      hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
      ]
    }]
  }
  return (
    <Grid
      container
      direction="row"
      justify="space-evenly"
      alignItems="center"
      spacing={16}
    >
      <Card className={classes.hours}>
        <CardContent className={classes.content}>
          <Typography variant="body1" component="h4" gutterBottom>
            {`Holiday hours remaining: ${timeRemaining}`}
          </Typography>
          <Typography variant="body1" component="h4">
            {`Holiday hours taken: ${timeTaken}`}
          </Typography>
        </CardContent>
      </Card>
      <Card className={classes.chart}>
        <CardContent className={classes.content}>
          <TimeChart data={data} />
        </CardContent>
      </Card>
    </Grid>
  )
}

export default TimeCard
