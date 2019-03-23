# TODO 
- Current time / date in nav
- If logged in, rediret to dashboard.
- Prevent empty user being created on signup.
- Fix login gate - have in Page but instead of returning login page - pass a prop that could be used to determine
if they are logged in or not?
- Notification when trying to edit permissions / profile but are `offline`.
- Notifications when you go offline?
- Permissions table - click event on whole cell for each permission.
- Try to remove "You have included the Google Maps JavaScript API multiple times on this page. This may cause unexpected errors."
- Get favicon working / manifest file.
- Custom 404
- Are you sure button when deleting user on my team.
- Record time - error when reload page and route to dashboard.
- My team - Charting with hours of all team members.
- Sorting?
- Other feature coming soon?
- Warning when submitting hours <40?
- Links working in offline - Need fallback anchor tags. Dashboard link currently works in offline.
- DEMO - Start demo at the backend then move to the frontend.
- When removing "MANAGER" from an existing user - they can still load the page but cannot add / delete.
- Loading users to add on my_team requires the user to be admin.

- Mobile login page scolling. Form background not correct.
- Input validation on inputs?
- Chart colours on Time Management.
- My Team - UI when all members are removed / Havent added anyone yet.
- Login - "Cannot read property 'password' of null" when the supplied email is not valid.
- Login - Prevent the user from submitting empty inputs?
- My team - manually routing when you dont have the permissions.
- Increase the page padding - 25px to 50px?
<br/><br/>

# Done 
- [x] Get chips working in time table.
- [x] My profile after timehsheets are done - have pie chart - PTO hours Remaining vs. Taken.
- [x] Modal confirmation on signout.
- [x] Mobile nav - client - ssr - detecting mobile requires userAent which is only available to client.
- [x] Remove request time off + rename record time to time management.
- [x] Get SVGs in the dashboard instead of the links.
- [x] More information on click of a user.
- [x] Notify user to submit their timehsheet.
- [x] What happens when you remove the "Employee" permissions from a user? Have no features available? - Curretly nothinh happens. 
<br/><br/>

# Would be nice to have 
- Full calendar for recording times - at least have had
- Try and get in - last week | current week | next week
<br/><br/>

# Code Tidyup
- Wes - Cleaning up render prop mess. (React-adopt)
- Currently the nav does a request for avatar and dashboard does same request - context api / apollo cache that you can consume currentUser info from? 
<br/><br/>