import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import Router from 'next/router'
import PermissionsTable from './PermissionsTable'
import ErrorMessage from '../../../common/components/Error'

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

const PermissionsPage = () => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>
      if (error) {
        if (error.message === 'GraphQL error: Please log in to do that!') Router.push('/login')
        if (error) return <ErrorMessage>{error.message.replace('GraphQL error: ', '')}</ErrorMessage>
        return null
      }
      if (data) {
        return (
          <>
            <h1>User Permissions</h1>
            <PermissionsTable users={data.users} />
          </>
        )
      }
    }}
  </Query>
)

export default PermissionsPage
