import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Card, CardActions, CardContent, Button, Typography, Avatar, Divider
} from '@material-ui/core'

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  avatar: {
    margin: 16,
  },
  deleteButton: {
    color: theme.palette.white,
    marginLeft: 'auto',
    backgroundColor: theme.palette.red.light,
    '&:hover': {
      backgroundColor: theme.palette.red.dark
    },
  }
})

class TeamMemberCard extends Component {
  render() {
    const {
      member, remove, classes, updateState
    } = this.props
    const fullName = `${member.firstName} ${member.lastName}`
    return (
      <>
        <Card className={classes.card} elevation={10}>
          <CardContent>
            <Avatar alt={fullName} src={member.avatar} className={classes.avatar} />
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {fullName}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <Button size="small" className={classes.deleteButton} onClick={() => {
              updateState('mostRecentlyDeleted', fullName)
              remove.removeFromTeam({ variables: { id: member.id } })
            }}>
              Delete
            </Button>
          </CardActions>
        </Card>
      </>
    )
  }
}

export default withStyles(styles)(TeamMemberCard)
