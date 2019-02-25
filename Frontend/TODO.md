14.02
  # TODO 
- Current time / date in nav
- If logged in, rediret to dashboard.
- Prevent empty user being created on signup.
- Fix login gate - have in Page but instead of returning login page - pass a prop that could be used to determine
if they are logged in or not?
- Currently the nav does a request for avatar and dashboard does same request - context api / apollo cache that you can consume currentUser info from?
- Notification when trying to edit permissions / profile but are `offline`.
- Notifications when you go offline?
- Permissions table - click event on whole cell for each permission.
- My profile after timehsheets are done - have pie chart - PTO hours Remaining vs. Taken.
<br/><br/>

# Done 
- [x] Modal confirmation on signout.
- [x] Mobile nav - client - ssr - detecting mobile requires userAent which is only available to client.
<br/><br/>

# Would be nice to have 
- Full calendar for recording times - at least have had  - last week | current week |next week
<br/><br/>

# Code Tidyup
- Wes - Cleaning up render prop mess. (React-adopt)
<br/><br/>