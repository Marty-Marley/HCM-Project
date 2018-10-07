/**
 * * Here we are specifying where the data is going to 
 * * The ctx contains the database data so when the client uses the createUser resolver
 * * it will be looking to the database.
 */

const Mutation = {
  async createEmployee(parent, args, ctx, info) {
    // TODO Check if user is logged in
    const employee = await ctx.db.mutation.createEmployee({
      data: {
        ...args
      }
    }, info)
    return employee
  }
}

module.exports = Mutation;