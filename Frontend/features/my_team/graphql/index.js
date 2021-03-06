import gql from 'graphql-tag'

// ! Note - For nested data, each layer needs an id

const MY_TEAM_QUERY = gql`
  query MY_TEAM_QUERY{
    currentUser {
      id
      firstName
      lastName
      team {
        id
        firstName
        lastName
        avatar
        role
        email
        id
        title
        salary
        localCurrency
        startDate
        birthDate
        address
        mobileNumber
        location
        gender
        timeInfo {
          weeks {
            hasSubmitted
          }
        }
      }
    }
  }
`

const ALL_USERS_QUERY = gql`
  query ALL_USERS_QUERY($ids: [ID!]) {
    users(where: { id_not_in: $ids }) {
      id
      firstName
      lastName
      avatar
    }
  }
`

const ADD_TO_TEAM_MUTATION = gql`
  mutation ADD_TO_TEAM_MUTATION($id: ID!) {
    addToTeam(id: $id) {
      id
      firstName
      lastName
      permissions
    }
  }
`

const REMOVE_FROM_TEAM = gql`
  mutation REMOVE_FROM_TEAM($id: ID!) {
    removeFromTeam(id: $id) {
      id
      firstName
      lastName
      permissions
    }
  }
`

const NOTIFY_USER_MUTATION = gql`
  mutation NOTIFY_USER_MUTATION($id: ID) {
    notifyTimesheetAction(id: $id) {
      id
      firstName
      lastName
      requiresAction
    }
  } 
`

export {
  MY_TEAM_QUERY, ALL_USERS_QUERY, ADD_TO_TEAM_MUTATION, REMOVE_FROM_TEAM, NOTIFY_USER_MUTATION
}
