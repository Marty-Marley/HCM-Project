const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/**
 * * Here we are specifying where the data is going to.
 * * The ctx contains the database data so when the client uses the createEmployee resolver
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
  },
  async createUser(parent, args, ctx, info) {
    // lowercase email so it isnt case sensitive
    args.email = args.email.toLowerCase()
    // Hash password
    const password = await bcrypt.hash(args.password, 10)
    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ['EMPLOYEE'] },
        entitlements: { set: ['PROFILE', 'HOLIDAYS', 'TIMESHEET'] }
      }
    }, info)
    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    // Put jwt in cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 14 // 2 week cookie
    })
    return user
  },
  async signin(parent, args, ctx, info) {
    // Grab user that is trying to log in
    const user = await ctx.db.query.user({ where: { email: args.email } })
    // Compare the given hashed password and compare it to the database password
    const isValid = await bcrypt.compare(args.password, user.password)
    // If either the user doesnt exist or the password is wrong - Throw error
    if (!user || !isValid) {
      throw new Error('Invalid username and password combination.')
    }
    // Create a new jwt on login
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      httpOnly: true, 
      maxAge: 1000 * 60 * 60 * 14 // 2 week cookie
    })
    return user
  },
  signout(parent, args, ctx, info) {
    ctx.response.clearCookie('token')
    return { message: 'You have signed out.' }
  }
}

module.exports = Mutation;