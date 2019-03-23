import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY{
    currentUser {
      id
      email
      firstName
      lastName
      permissions
      entitlements
      avatar
      role
      requiresAction
      timeInfo {
        id
        weeks {
          id
          hasSubmitted
        }
    }
    }
  }
`

export { CURRENT_USER_QUERY }
