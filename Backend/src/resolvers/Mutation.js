const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { hasPermission } = require('../utils')

/**
 * * Here we are specifying where the data is going to.
 * * The ctx contains the database data so when the client uses the createEmployee resolver
 * * it will be looking to the database.
 */
const Mutation = {
  async createUser(parent, args, ctx, info) {
    // Lowercase email so it isnt case sensitive
    args.email = args.email.toLowerCase()
    // Hash password
    const password = await bcrypt.hash(args.password, 12)
    // Pravatar api provides random image of face - Generate random num + append to api url
    const randomAvatarNumber = Math.floor((Math.random() * 68) + 1)
    const avatar = `https://avatars.dicebear.com/v2/avataaars/${randomAvatarNumber}.svg`

    // Define all roles
    const roles = [
      'SOFTWARE_ENGINEER',
      'BUSINESS_ANALYST',
      'PROJECT_MANAGER',
      'QUALITY_ASSURANCE_ENGINEER',
    ]
    // Get random number between 0-3 - 0 is inclusive
    const randomRoleNumber = Math.floor((Math.random() * 3))
    // Set random role
    const newUserRole = roles[randomRoleNumber]

    // Random salary between 25-100k 
    const randomSalary = (Math.floor((Math.random() * (100-25+1)) + 25)) * 1000
    // Define local currencies
    const localCurrencies = [
      'Pound',
      'Dollar',
      'Euro',
      'Yuan'
    ]
    // Select random currency
    const randomCurrencyIndex = Math.floor((Math.random() * 3))
    const randomCurrency = localCurrencies[randomCurrencyIndex]

    // Random start date
    const start = new Date(2018, 0, 1)
    const end = new Date()
    const startDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))

    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        avatar,
        salary: randomSalary,
        localCurrency: randomCurrency,
        role: { set: newUserRole },
        startDate,
        permissions: { set: ['EMPLOYEE'] },
        entitlements: { set: ['MY_PROFILE', 'RECORD_TIME'] },
        timeInfo: {
          create: {
            timeRemaining: 120,
            timeTaken: 0,
            weeks: {
              create: {
                monday: {
                  create: {
                    hours: null,
                    type: null
                  }
                },
                tuesday: {
                  create: {
                    hours: null,
                    type: null
                  }
                },
                wednesday: {
                  create: {
                    hours: null,
                    type: null
                  }
                },
                thursday: {
                  create: {
                    hours: null,
                    type: null
                  }
                },
                friday: {
                  create: {
                    hours: null,
                    type: null
                  }
                }
              }
            }
          }
        }
      }
    }, info)

    // Generate JWT
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    // Put JWT in cookie
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 // 24h cookie
    })
    return user
  },

  async signin(parent, args, ctx, info) {
    if (args.email === '' || args.password === '') {
      throw new Error('Invalid email and password combination.')
    }
    // Grab user that is trying to log in
    const user = await ctx.db.query.user({ where: { email: args.email } })
    if (!user) {
      throw new Error('Invalid email and password combination.')
    }
    // Compare the given hashed password and compare it to the database password
    const isValid = await bcrypt.compare(args.password, user.password)
    // If either the user doesnt exist or the password is wrong - Throw error
    if (!user || !isValid || args.email === '' || args.password === '') {
      throw new Error('Invalid email and password combination.')
    }
    // Create a new jwt on login
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET)
    ctx.response.cookie('token', token, {
      httpOnly: true, 
      maxAge: 1000 * 60 * 60 * 24 // 24h cookie
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
    if(!ctx.request.userId) {
      throw new Error('Please log in to do that!')
    }
    // Get user info of user that is attempting update.
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      info
    )
    // Throw error if current user isn't an admin.
    hasPermission(currentUser, ['ADMIN'])
    
    let userEntitlements = [
    ]

    if(args.permissions.includes('EMPLOYEE')) {
      userEntitlements.push('MY_PROFILE')
      userEntitlements.push('RECORD_TIME')
    }

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
    )

  },

  async editProfile(parent, args, ctx, info) {
    // Is current user logged in?
    if(!ctx.request.userId) {
      throw new Error('Please log in to do that!')
    }
    // Update user information
    return ctx.db.mutation.updateUser(
      {
        data: {
          ...args
        },
        where: {
          id: ctx.request.userId,
        },
      },
      info
    )
  },

  async editTimesheet(parent, args, ctx, info) {
    // If user isnt logged in - Throw error
    if(!ctx.request.userId) {
      throw new Error('Please log in to do that!')
    }

    // Get currentUser info for the week ID
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
          // TODO email: "marty@gmail.com" (get rid of this line)
        },
      },
      info
    )

    // Calculate the total PTO hours the user has just submitted.
    let ptoHours = 0
    let updatedTimeRemaining = 0
    let updatedTimeTaken = 0
    Object.keys(args).map(key => {
      if (args[key].type === 'PTO') {
        ptoHours += args[key].hours
      }
    })
    
    if (!currentUser.timeInfo.weeks[0].hasSubmitted) {
      // Reduce timeRemaining + add to timneTaken with newly submitted PTO hours
      updatedTimeRemaining = currentUser.timeInfo.timeRemaining >= ptoHours ? currentUser.timeInfo.timeRemaining - ptoHours : 0
      updatedTimeTaken = currentUser.timeInfo.timeTaken + ptoHours < 120 ? currentUser.timeInfo.timeTaken + ptoHours : 120
    } else {
      updatedTimeRemaining  = 120 - ptoHours
      updatedTimeTaken = 0 + ptoHours
    }


    return ctx.db.mutation.updateUser(
      {
        data: {
          timeInfo: {
            update: {
              timeRemaining: updatedTimeRemaining,
              timeTaken: updatedTimeTaken,
              weeks: {
                update: {
                  where: {id: currentUser.timeInfo.weeks[0].id},
                  data: {
                    hasSubmitted: true,
                    monday: {
                      update: {
                        hours: args.monday.hours,
                        type: args.monday.type
                      }
                    },
                    tuesday: {
                      update: {
                        hours: args.tuesday.hours,
                        type: args.tuesday.type
                      }
                    },
                    wednesday: {
                       update: {
                        hours: args.wednesday.hours,
                        type: args.wednesday.type
                      }
                    },
                    thursday: {
                      update: {
                        hours: args.thursday.hours,
                        type: args.thursday.type
                      }
                    },
                    friday: {
                      update: {
                        hours: args.friday.hours,
                        type: args.friday.type
                      }
                    }
                  }
                }
              }
            }
          },
          requiresAction: false

        },
        where: {
          id: ctx.request.userId,
          // TODO id: currentUser.id
        },
      },
      info
    )
  },

  async addToTeam(parent, args, ctx, info ) {
    // If user isnt logged in - Throw error
    if(!ctx.request.userId) {
      throw new Error('Please log in to do that!')
    }

    // Get currentUser info for permissions data
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      info
    )

    // Throw error if current user isnt a manager
    hasPermission(currentUser, ['MANAGER'])

    return ctx.db.mutation.updateUser(
      {
        data: {
          team: {
            connect: {
              id: args.id
            }
          }
        },
        where: {
          id: ctx.request.userId,
        },
      },
      info
    )
  },

  async removeFromTeam(parent, args, ctx, info ) {
    // If user isnt logged in - Throw error
    if(!ctx.request.userId) {
      throw new Error('Please log in to do that!')
    }

    // Get currentUser info for permissions data
    const currentUser = await ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId,
        },
      },
      info
    )

    // Throw error if current user isnt a manager
    hasPermission(currentUser, ['MANAGER'])

    return ctx.db.mutation.updateUser(
      {
        data: {
          team: {
            disconnect: {
              id: args.id
            }
          }
        },
        where: {
          id: ctx.request.userId,
        },
      },
      info
    )
  },

  async notifyTimesheetAction(parent, args, ctx, info ) {
    // If user isnt logged in - Throw error
    if(!ctx.request.userId) {
      throw new Error('Please log in to do that!')
    }

    // Update user information - Similar to editProfile but id is being specified from client.
    return ctx.db.mutation.updateUser(
      {
        data: {
          requiresAction: true
        },
        where: {
          id: args.id
        },
      },
      info
    )
  },

}

module.exports = Mutation;