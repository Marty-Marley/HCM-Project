import React from 'react'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Warning from '@material-ui/icons/Warning';
import Home from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import Router from 'next/router'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: '#f4aa42'
  },
  icon: {
    marginTop: theme.spacing.unit,
  },
  button: {
    float: 'right'
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
});

const ErrorMessage = (props) => {
  const { classes, children } = props;
  return (
    <div>
      <Paper className={classes.root} elevation={1}>
        <Typography variant="h6" component="h5">
          {children}
          <Button className={classes.button} onClick={() => {
            Router.push('/')
          }}>
            Return to dashboard
            <Home className={classes.rightIcon} />
          </Button>
        </Typography>
      </Paper>
    </div>
  )
}

ErrorMessage.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
};

export default withStyles(styles)(ErrorMessage);
