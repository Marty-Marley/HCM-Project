import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import styled from 'styled-components'
import Employee from './Employee'
import Card from '../../../common/components/Card'
// TODO change to absolute path? ^

// Styled component for cardwrapper
const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 100vmin;
  grid-gap: 2em;
  margin: 0 auto;
`

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
const MyTeam = () => (
  <>
    <h1>My TEAM</h1>
    <CardWrapper>
      <Query query={ALL_EMPLOYEES_QUERY}>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          if (error) return <p>{error.message}</p>
          return data.employees.map(employee => (
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
