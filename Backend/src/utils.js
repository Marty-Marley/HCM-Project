function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  )
  if (!matchedPermissions.length) {
    throw new Error(`You need ${permissionsNeeded} for this feature. You are ${user.permissions}`)
  }
}

exports.hasPermission = hasPermission