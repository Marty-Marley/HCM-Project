import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import {
  Card, CardActions, CardContent, Button, Typography, Avatar, Divider, Chip, Grid
} from '@material-ui/core'
import AccessTime from '@material-ui/icons/AccessTime'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'


const styles = theme => ({
  card: {
    minWidth: 275,
  },
  title: {
    fontSize: 14,
  },
  avatar: {
    margin: 10,
    width: 70,
    height: 70,
    marginRight: '26px'
  },
  avatarBorder: {
    borderRight: '1px solid #e0e0e0'
  },
  deleteButton: {
    color: theme.palette.white,
    marginLeft: 'auto',
    backgroundColor: theme.palette.red.light,
    '&:hover': {
      backgroundColor: theme.palette.red.dark
    },
  },
  hasSubmitted: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.green.light,
  },
  hasNotSubmitted: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.red.light,
  },
  chipAvatarSubmitted: {
    color: theme.palette.white,
    backgroundColor: theme.palette.green.dark,
  },
  chipAvatarNotSubmitted: {
    color: theme.palette.white,
    backgroundColor: theme.palette.red.dark,
  },
  avatarFocusSubmitted: {
    '&:focus': {
      backgroundColor: theme.palette.green.light,
    },
  },
  avatarFocusNotSubmitted: {
    '&:focus': {
      backgroundColor: theme.palette.red.light,
    },
  },
  deleteIcon: {
    cursor: 'unset',
    color: theme.palette.white,
    '&:hover': {
      color: theme.palette.white,
    },
  }
})

class TeamMemberCard extends Component {
  render() {
    const {
      member, remove, classes, updateParentState, mostRecentlyDeletedId
    } = this.props
    const fullName = `${member.firstName} ${member.lastName}`
    const hasSubmitted = member.timeInfo.weeks[0].hasSubmitted
    const role = member.role[0].replace('_', ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase())
    // console.log(member)
    return (
      <>
        <Card className={classes.card} elevation={10}>
          <CardContent>
            <Grid container wrap="nowrap" alignItems="center">
              <div className={classes.avatarBorder}><Avatar alt={fullName} src={member.avatar} className={classes.avatar} /></div>
              <Grid container direction="column" justify="center" alignItems="flex-end">
                <Typography variant="h6" gutterBottom>
                  {fullName}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {role}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {member.email}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
          <Divider variant="middle" />
          <CardActions>
            <Chip
              avatar={
                <Avatar>
                  <AccessTime />
                </Avatar>
              }
              label="Submitted Timesheet"
              clickable={false}
              onDelete={() => { }}
              deleteIcon={hasSubmitted ? <Check /> : <Close />}
              className={hasSubmitted ? classes.hasSubmitted : classes.hasNotSubmitted}
              color="primary"
              classes={{
                avatarColorPrimary: hasSubmitted ? classes.chipAvatarSubmitted : classes.chipAvatarNotSubmitted,
                deletableColorPrimary: hasSubmitted ? classes.avatarFocusSubmitted : classes.avatarFocusNotSubmitted,
                deleteIconColorPrimary: classes.deleteIcon
              }}
            />
            <Button size="small" className={classes.deleteButton} onClick={() => {
              updateParentState('mostRecentlyDeleted', fullName)
              updateParentState('mostRecentlyDeletedId', member.id)

              remove.removeFromTeam({ variables: { id: member.id } })
            }} disabled={remove.result.loading && mostRecentlyDeletedId === member.id}>
              {`Delet${remove.result.loading && mostRecentlyDeletedId === member.id ? 'ing' : 'e'}`}
            </Button>
          </CardActions>
        </Card>
      </>
    )
  }
}

export default withStyles(styles)(TeamMemberCard)
