import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

const WelcomeBanner = (props) => {
  const { classes, currentUser: { firstName } } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={10}>
        <Typography variant="h5" component="h3">
          {`Welcome back ${firstName}`}
        </Typography>
      </Paper>
    </div>
  )
}

WelcomeBanner.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
}

export default withStyles(styles)(WelcomeBanner)
