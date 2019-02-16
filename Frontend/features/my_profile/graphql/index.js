import gql from 'graphql-tag'

const CURRENT_USER_QUERY = gql`
  query CURRENT_USER_QUERY{
    currentUser {
      id
      email
      firstName
      lastName
      title
      permissions
      entitlements
      avatar
      role
      age
      salary
      localCurrency
      startDate
      birthDate
      address
      mobileNumber
      location
      gender
    }
  }
`

export { CURRENT_USER_QUERY }
