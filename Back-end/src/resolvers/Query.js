/**
 * * Here we are specifying where the data is coming from 
 * * The ctx contains the database data so when the client uses the users() resolver
 * * it will be looking to the database.
 * * At this point you could be hitting a REST API/CSV to get some data.
 * * The prisma.graphql will tell you what resolvers are available on 'query'
 */

 const { forwardTo } = require('prisma-binding')

const Query = {
  // ! Any query that doesnt require any custom logic can just be forwarded as prisma already knows what to do
  // async users(parent, args, ctx, info) {
  //   const users = await ctx.db.query.users()
  //   return users
  // }
  users: forwardTo('db')
}

module.exports = Query;