import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Employee from './Employee'
import Card from '../../../app/components/Card'
// TODO change to absolute path? ^

const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100vmin;
  grid-gap: 2em;
  margin: 0 auto;
`

const ALL_EMPLOYEES_QUERY = gql`
  query ALL_EMPLOYEES_QUERY {
    employees {
      id
      name
      email
      age
      avatar
      entitlements
    }
  }
`

const MyTeam = () => (
  <>
    <h1>My TEAM</h1>
    <CardWrapper>
      <Query query={ALL_EMPLOYEES_QUERY}>
        {({ data: { employees }, loading }) => {
          if (loading) return <p>Loading...</p>
          return employees.map(employee => (
            // TODO Have a employee component here to separate out the rendering
            <Card key={employee.id}>
              <Employee {...employee} />
            </Card>
          ))
        }}
      </Query>
    </CardWrapper>
  </>
)

export default MyTeam
