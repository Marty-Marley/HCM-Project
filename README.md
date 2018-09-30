# HCM-Project
A human capital management application which can be used throughout a company. 

### Technologies:

## React
* Server Side Rendering 
* Styled Components
* Render Props
* Portals
* TypeScript (Not at start)
* AirBnB linting (Will conflict with TypeScript?)
* EditorConfig
* Testing - Jest - React Testing Library
* Electron
* Progressive Web App

## Apollo
* Perform GQL Queries and Mutations
* Allows you to use caching and local state.
* Easy error and loading state with queries and mutations.

## GraphQL Yoga
* Node - Express Sever
* This is where you explicitly expose your public GQL API
* Have to manually write queries / mutations / resolvers
* You then have the ability to set up authentication and permissions.Through middleware that sits between each request and response.
* Also using JSON Web Token (JWT) to verify that a user is who they say they are. We are storing the JWTs in cookies - need to use cookies instead of local storage do to SSR.
* Hashing password before they reach database.

## Prisma
* You provide prism with a starting schema with types, along with shape + their types. It then creates the DB API with CRUD operations.
* You specify your type relationships here.
* The Yoga server queries the prism server which in turn informs the database of any changes.
* Prisma sits on top of the database.
* You can host the database locally with Docker. MySQL / Postgres / MongoDB
* Prisma also offer a free service to host the db externally. As a demo server with limited space and requests over time (10 per 10s)

TODO: 
* Basic sign in / up.
* Authentication with JWT
* Hashing passwords on server