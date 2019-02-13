const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { hasPermission } = require('../utils')

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
    // Lowercase email so it isnt case sensitive
    args.email = args.email.toLowerCase()
    // Hash password
    const password = await bcrypt.hash(args.password, 10)
    // Pravatar api provides random image of face - Generate random num + append to api url
    let randomAvatarNumber = Math.floor((Math.random() * 68) + 1)
    const avatar = `http://i.pravatar.cc/150?img=${randomAvatarNumber}`

    // Define all roles
    const roles = [
      'SOFTWARE_ENGINEER',
      'BUSINESS_ANALYST',
      'PROJECT_MANAGER',
      'QUALITY_ASSURANCE_ENGINEER',
    ]
    // Get random number between 0-3 - 0 is inclusive
    const randomRoleNumber = Math.floor((Math.random() * 3));
    // Set random role
    const newUserRole = roles[randomRoleNumber]

    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        avatar,
        role: { set: newUserRole },
        permissions: { set: ['EMPLOYEE'] },
        entitlements: { set: ['MY_PROFILE', 'REQUEST_TIME_OFF', 'RECORD_TIME'] }
      }
    }, info)

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    // Put JWT in cookie
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
    // Clear token from the cookie on logout.
    ctx.response.clearCookie('token')
    return { message: 'You have signed out.' }
  },


  async editPermissions(parent, args, ctx, info) {
    // Is current user logged in?
    // if(!ctx.request.userId) {
    //   throw new Error('Please log in to do that!')
    // }
    // Get user info of user that is attempted to be updated.
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      info
    )
    // Throw error if current user isn't an admin.
    // hasPermission(currentUser, ['ADMIN']);
    
    let userEntitlements = [
      'MY_PROFILE',
      'REQUEST_TIME_OFF',
      'RECORD_TIME',
    ]

    if(args.permissions.includes('MANAGER')) {
      userEntitlements.push('MY_TEAM')
    }

    if(args.permissions.includes('ADMIN')) {
      userEntitlements.push('PERMISSIONS')
    }

    return ctx.db.mutation.updateUser(
      {
        data: {
          permissions: {
            set: args.permissions,
          },
          entitlements: {
            set: userEntitlements
          }
        },
        where: {
          id: args.userId,
        },
      },
      info
    );

  }
}

module.exports = Mutation;