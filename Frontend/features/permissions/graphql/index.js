import gql from 'graphql-tag'

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY {
    users {
      id
      firstName
      lastName
      email
      permissions
      avatar
      role
    }
  }
`

export { ALL_USERS_QUERY }
