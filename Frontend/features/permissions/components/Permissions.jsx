import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
    }
  }
`

const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>{error.message}</p>
      return <p>Permissions Page</p>
    }}
  </Query>
)

export default Permissions
