/**
 * * Here we are specifying where the data is going to 
 * * The ctx contains the database data so when the client uses the createUser resolver
 * * it will be looking to the database.
 */

const Mutation = {
  async createUser(parent, args, ctx, info) {
    // TODO Check if user is logged in
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args
      }
    }, info)
    return user
  }
}

module.exports = Mutation;