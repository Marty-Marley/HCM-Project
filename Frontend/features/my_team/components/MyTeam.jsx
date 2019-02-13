import React, { Component } from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Head from 'next/head'
import { withSnackbar } from 'notistack'
import Router from 'next/router'
import { Button } from '@material-ui/core'
import Home from '@material-ui/icons/Home'
import CircularProgress from '@material-ui/core/CircularProgress'
import { withStyles } from '@material-ui/core/styles'
import Employee from './Employee'
// TODO change to absolute path? ^

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
})

// GraphQL query for getting all employees
const ALL_EMPLOYEES_QUERY = gql`
  query ALL_EMPLOYEES_QUERY {
    employees {
      id
      name
      email
      age
      avatar
    }
  }
`

/**
 * Functional component for rendering out the My Team feature.
 * Using apollo query render prop for retieving data.
 * Employee data is wrapped in card and cardWrapper for styling.
 */
class MyTeam extends Component {
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
      <>
        <Head>
          <title>My Team</title>
        </Head>
        <Query
          query={ALL_EMPLOYEES_QUERY}
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
            if (error) return null
            return (
              data.employees.map(employee => (
                <div key={employee.id}>
                  <Employee {...employee} />
                </div>
              )))
          }}
        </Query>
      </>
    )
  }
}


export default withStyles(styles)(
  withSnackbar(MyTeam),
)
