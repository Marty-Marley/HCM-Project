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

const EDIT_USER_MUTATION = gql`
  mutation EDIT_USER_MUTATION($email: String, $firstName: String, $lastName: String, $title: String, $localCurrency: String, $birthDate: DateTime, 
    $address: String, $mobileNumber: String, $location: String, $gender: String) {
    editProfile(email: $email, firstName: $firstName, lastName: $lastName, title: $title, localCurrency: $localCurrency, birthDate: $birthDate, 
    address: $address, mobileNumber: $mobileNumber, location: $location, gender: $gender) {
      id
      firstName
      lastName
    }
  } 
`

export { CURRENT_USER_QUERY, EDIT_USER_MUTATION }
