import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import { withSnackbar } from 'notistack'
import { Button } from '@material-ui/core'
import Home from '@material-ui/icons/Home'
import Head from 'next/head'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PermissionsTable from './PermissionsTable'
import { ALL_USERS_QUERY } from '../graphql'

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

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
          if (loading) return <p>Loading...</p>
          if (error) {
            if (error.message === 'Please log in to do that!') Router.push('/login')
          }
          return (
            <>
              <Head>
                <title>Permissions</title>
              </Head>
              {
                data
                && <>
                  <Typography variant="h3" component="h3" color="secondary">
                    User Permissions
                  </Typography>
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
