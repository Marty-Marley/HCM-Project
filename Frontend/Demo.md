## Demo Notes


## Login - Signup

### Login
- Enter Email + Password combination.
- Client sends what the user enters to the server. (HTTPS)
- Backend:
    - If email | password is blank - Throw error
    - Retrieves the information on the user corresponding to the supplied email.
    - Decrypt the corresponding hashed password + compare with supplied password.
    - If there is no corresponding user for the supplied password is wrong - Throw error.
    - If everything is successful at this point: Sign JWT with User ID - Store in cookie - send to client.
- Frontend:
  - If the server successfully responds with no errors - Route to dashboard - '/'

### Signup
- On cick of create account  - show form for email - password - firstName - lastName
- On click of sign up send details to backend
- Backend: 
  - Convert email to lowercase.

## Dashboard
- On mount - Fire current user query - Get name | entitlements | avatar
- If manager has required an employee to complete timesheet - Show snackbar / notification.
- Display features card - SVG corresponding to each feature you are entitiled to.

## My Profile
- On mount - Fire current user query - Get all profile data.
- Display information apporopriately.
- Allow the user to toggle into edit mode so they can change the details + update DB.
- On successful edit, show notification to inform the user that the update was successful.
- DOB - React Date Picker
- Location - Google Places API

## Record Time
- On mount - Get timesheet info.
- Display the information for the current week, if it exists.
- Allow the user to input hours of PTO and WRK.
- Display remaining + taken PTO hours.
- Display the same information ^ in the donought chart.
- On successful update - Show successful notification.

## My Team
- Only Manager can access this feature.
- On mount - Get the team info for the current user (manager).
- Display all the members of the team.
- Allow members be added to the team via button / dropdown. (All users that arent already in the team + not the current user.)
- Allow members to be removed from the team via Delete button. 
- Notification on successful add / remove member.
- If a member hasn't submitted their timehsheet - Allow the manager to notify that member - Modal confirmation.
- Display additional information on each member of the team on click the vertical elipsis.

## Permissions
- Only admin can access this feature.
- On mount - Get information on all users.
- Display info in table w/ their permissions as checkboxes + update button.
- Allow the admin to change a users permissions but only dispatch the update on click on the Update button.
- Display success notification on successful update of permissions.
