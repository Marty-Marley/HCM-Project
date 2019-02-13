import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import { withSnackbar } from 'notistack'
import { Button } from '@material-ui/core';
import Home from '@material-ui/icons/Home';
import Head from 'next/head'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import PermissionsTable from './PermissionsTable'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
      avatar
      role
    }
  }
`

class PermissionsPage extends Component {
  summonSnackbar = (message, variant, position, linger = null) => {
    const { enqueueSnackbar } = this.props
    enqueueSnackbar(message, {
      variant,
      action: (
        <Button onClick={() => {
          Router.push('/')
        }}>
          <Home />
        </Button>
      ),
      anchorOrigin: position,
      autoHideDuration: linger
    })
  }

  render() {
    const { classes } = this.props
    return (
      <Query
        query={ALL_USERS_QUERY}
        onError={(e) => {
          this.summonSnackbar(
            e.message.replace('GraphQL error: ', ''),
            'warning',
            {
              vertical: 'top',
              horizontal: 'center',
            },
            3000
          )
        }}
      >
        {({ data, loading, error }) => {
          if (loading) return <CircularProgress className={classes.progress} />
          if (error) {
            if (error.message === 'GraphQL error: Please log in to do that!') Router.push('/login')
          }
          return (
            <>
              <Head>
                <title>Permissions</title>
              </Head>
              {
                data
                && <>
                  <h1>User Permissions</h1>
                  <PermissionsTable users={data.users} />
                </>
              }
            </>
          )
        }}
      </Query>
    )
  }
}


export default withStyles(styles)(
  withSnackbar(PermissionsPage),
)
