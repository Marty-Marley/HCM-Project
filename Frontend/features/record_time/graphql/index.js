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
      $monday: DayUpdateDataInput, $tuesday: DayUpdateDataInput, $wednesday: DayUpdateDataInput,
      $thursday: DayUpdateDataInput, $friday: DayUpdateDataInput
      ) {
    editTimesheet(
      monday: $monday, tuesday: $tuesday, wednesday: $wednesday,
      thursday: $thursday, friday: $friday
    ) {
      firstName
      lastName
      timeInfo {
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

export { CURRENT_USER_TIMESHEET_QUERY, EDIT_TIMESHEET_MUTATION }
