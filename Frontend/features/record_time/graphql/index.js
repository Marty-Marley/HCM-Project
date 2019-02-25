import gql from 'graphql-tag'

// * Note - For nested data, each layer needs an id

const CURRENT_USER_TIMESHEET_QUERY = gql`
  query CURRENT_USER_TIMESHEET_QUERY{
    currentUser {
      id
      firstName
      lastName
      timeInfo {
        id
        timeRemaining
        timeTaken
        weeks {
        id
        hasSubmitted
        monday {
          hours
          type
        }
        tuesday {
          hours
          type
        }
        wednesday {
          hours
          type
        }
        thursday {
          hours
          type
        }
        friday {
          hours
          type
        }
      }
      }
    }
  }
`

const EDIT_TIMESHEET_MUTATION = gql`
  mutation EDIT_TIMESHEET_MUTATION(
      $mondayHours: Int, $mondayType: String,
      $tuesdayHours: Int, $tuesdayType: String,
      $wednesdayHours: Int, $wednesdayType: String,
      $thursdayHours: Int, $thursdayType: String,
      $fridayHours: Int, $fridayType: String) {
    editTimesheet(
      mondayHours: $mondayHours
      mondayType: $mondayType
      tuesdayHours: $tuesdayHours
      tuesdayType: $tuesdayType
      wednesdayHours: $wednesdayHours
      wednesdayType: $wednesdayType
      thursdayHours: $thursdayHours
      thursdayType: $thursdayType
      fridayHours: $fridayHours
      fridayType: $fridayType
    ) {
      firstName
      lastName
      timeInfo {
      timeRemaining
      timeTaken
      weeks {
        id
        monday {
          hours
          type
        }
        tuesday {
          hours
          type
        }
        wednesday {
          hours
          type
        }
        thursday {
          hours
          type
        }
        friday {
          hours
          type
        }
      }
    }
    }
  }
`

export { CURRENT_USER_TIMESHEET_QUERY, EDIT_TIMESHEET_MUTATION }
