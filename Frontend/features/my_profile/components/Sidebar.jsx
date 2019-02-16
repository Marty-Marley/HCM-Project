import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  avatar: {
    margin: 10,
    width: 120,
    height: 120,
  },
  headings: {
    padding: '5px'
  }
})

const Sidebar = ({ currentUser, classes }) => (
  <>
    <Grid container justify="center" alignItems="center">
      <Avatar alt={currentUser.firstName} src={currentUser.avatar} className={classes.avatar} />
    </Grid>
    <Divider variant="middle" />
    <Grid container direction="column" justify="center" alignItems="center" className={classes.headings}>
      <Grid item>
        <Typography variant="h6" component="h5">
          {`${currentUser.firstName} ${currentUser.lastName}`}
        </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h6" component="h5">
          {currentUser.role[0].replace('_', ' ')}
        </Typography>
      </Grid>
    </Grid>
    <Divider variant="middle" />
    <Grid container direction="column" justify="center" alignItems="center">
      <Grid item>
        <Typography variant="subtitle2" component="h5">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Blanditiis, nobis?
        </Typography>
      </Grid>
    </Grid>
  </>
)

export default withStyles(styles)(Sidebar)
