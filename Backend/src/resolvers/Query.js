/**
 * * Here we are specifying where the data is coming from 
 * * The ctx contains the database data so when the client uses the users() resolver
 * * it will be looking to the database.
 * * At this point you could be hitting a REST API/CSV to get some data.
 * * The prisma.graphql will tell you what resolvers are available on 'query'
 */

const { forwardTo } = require('prisma-binding')
const { hasPermission } = require('../utils')

const Query = {
  // ! Any query that doesnt require any custom logic can just be forwarded as prisma already knows what to do
  currentUser(parent, args, ctx, info) {
    // If there is NOT a userId, i.e. no jwt generated from login or signup
    if(!ctx.request.userId) {
      throw new Error('Please log in to do that!')
    }
    return ctx.db.query.user({
      where: { id: ctx.request.userId }
    }, info)
  },

  async users(parent, args, ctx, info) {
    // If user isnt logged in - throw error
    if(!ctx.request.userId) {
      throw new Error('Please log in to do that!')
    }
    // Check to see if current user has permission to get all users
    hasPermission(ctx.request.user, ['ADMIN'])
    // If they have permissions, return all users
    return ctx.db.query.users({}, info)
  },
}

module.exports = Query;