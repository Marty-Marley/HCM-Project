function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(`You need to be ${permissionsNeeded} for that. You are ${user.permissions}`);
  }
}

exports.hasPermission = hasPermission;