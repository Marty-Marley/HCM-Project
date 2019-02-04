import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import PermissionsTable from './PermissionsTable'

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      name
      email
      permissions
      avatar
    }
  }
`

const PermissionsPage = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>{error.message}</p>
      return (
        <>
          <h1>User Permissions</h1>
          <PermissionsTable users={data.users} />
        </>
      )
    }}
  </Query>
)

export default PermissionsPage
