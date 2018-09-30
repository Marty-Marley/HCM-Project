import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const ALL_EMPLOYEES_QUERY = gql`
  query ALL_EMPLOYEES_QUERY {
    users {
      id
      name
      email
      age
    }
  }
`

const MyTeam = () => (
  <>
    <h1>My TEAM</h1>
    <Query query={ALL_EMPLOYEES_QUERY}>
      {({ data: { users }, loading }) => {
        if (loading) return <p>Loading...</p>
        return users.map(employee => (
          // TODO Have a employee component here to separate out the rendering
          <p key={employee.id}>{employee.name}</p>
        ))
      }}
    </Query>
  </>
)

export default MyTeam
