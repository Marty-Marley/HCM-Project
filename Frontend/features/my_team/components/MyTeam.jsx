import React, { Component } from 'react'
import { Query, Mutation } from 'react-apollo'
import { adopt } from 'react-adopt'
import Head from 'next/head'
import { withSnackbar } from 'notistack'
import Router from 'next/router'
import { Button, Grid, Typography } from '@material-ui/core'
import Home from '@material-ui/icons/Home'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import { MY_TEAM_QUERY, ADD_TO_TEAM_MUTATION, REMOVE_FROM_TEAM } from '../graphql'
import AddMemberMenu from './AddMemberMenu'
import TeamMemberCard from './TeamMemberCard'

// TODO Use expansion panels - secondary heading

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
  title: {
    marginBottom: '24px'
  }
})

/* eslint-disable */
const Composed = adopt({
  teamMembers: ({ render }) => <Query query={MY_TEAM_QUERY}>{render}</Query>,
  addToTeam: ({ state, summonSnackbar, render }) => (
    <Mutation mutation={ADD_TO_TEAM_MUTATION} refetchQueries={[{ query: MY_TEAM_QUERY }]} onCompleted={(addToTeam) => {
      const message = `${state.mostRecentlyAdded} has been added to your team`
      summonSnackbar(message, 'success', { vertical: 'top', horizontal: 'right' })
    }}>
      {(addToTeam, result) => render({ addToTeam, result })}
    </Mutation>
  ),
  removeFromTeam: ({ state, summonSnackbar, render }) => (
    <Mutation mutation={REMOVE_FROM_TEAM} refetchQueries={[{ query: MY_TEAM_QUERY }]} onCompleted={(removeFromTeam) => {
      const message = `${state.mostRecentlyDeleted} has been removed from your team`
      summonSnackbar(message, 'success', { vertical: 'top', horizontal: 'right' })
    }}>
      {(removeFromTeam, result) => render({ removeFromTeam, result })}
    </Mutation>
  ),

})
/* eslint-enable */

class MyTeam extends Component {
  state = {
    currentTeam: [],
    mostRecentlyDeletedId: ''
  }

  summonSnackbar = (message, variant, position, linger = 3000) => {
    const { enqueueSnackbar } = this.props

    enqueueSnackbar(message, {
      variant,
      action: (
        <Button>
          Dismiss
        </Button>
      ),
      anchorOrigin: position,
      autoHideDuration: linger
    })
  }

  updateState = (key, value) => {
    this.setState({ [key]: value })
  }

  render() {
    const { classes, enqueueSnackbar } = this.props
    const { mostRecentlyDeletedId } = this.state
    return (
      <>
        <Head>
          <title>My Team</title>
        </Head>
        <Typography variant="h3" component="h3" color="secondary" className={classes.title}>
          My Team
        </Typography>
        <Composed summonSnackbar={this.summonSnackbar} state={this.state}>
          {({ teamMembers, addToTeam, removeFromTeam }) => {
            const { loading, error } = teamMembers
            const { currentUser } = teamMembers.data
            if (loading) return <p>Loading...</p>
            if (error) return <p>{error.message}</p>

            const currentTeamMembersId = []
            teamMembers.data.currentUser.team.map((member) => {
              currentTeamMembersId.push(member.id)
            })
            currentTeamMembersId.push(currentUser.id)
            return (
              <>
                <AddMemberMenu addMember={addToTeam} updateState={this.updateState} currentTeam={currentTeamMembersId} />
                <Grid
                  container
                  direction="row"
                  spacing={24}
                >
                  {currentUser.team.map(member => (
                    <Grid item xs={12} sm={4} key={member.id}><TeamMemberCard member={member} remove={removeFromTeam} updateParentState={this.updateState} mostRecentlyDeletedId={mostRecentlyDeletedId} /></Grid>
                  ))}
                </Grid>
              </>
            )
          }}
        </Composed>
      </>
    )
  }
}


export default withStyles(styles)(
  withSnackbar(MyTeam),
)
