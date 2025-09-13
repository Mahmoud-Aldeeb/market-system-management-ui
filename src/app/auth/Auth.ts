interface userDataType  {
  id: number,
  name: string,
  role: {
    name: string,
    "permissions": string[]
  },
  dep: string,
  email: string,
  phone: string,
  pic: string,
  username: string
}

export function hasPermission(permission: userDataType): boolean {
  if(permission.role.name == "Super Admin" && permission.dep == "IT") return true;
<<<<<<< HEAD
  if(permission.role.name == "Super Admin" && permission.dep == "Hr") return true;
  if(permission.role.name == "Super Admin" && permission.dep == "IT") return true;
  if(permission.role.name == "Super Admin" && permission.dep == "IT") return true;
  if(permission.role.name == "Admin" && permission.dep == "hr") return true;
=======
>>>>>>> upstream/main
  if(permission.role.name == "Admin" && permission.role.permissions.includes("create") && permission.role.permissions.includes("read") && permission.role.permissions.includes("update")) return true;
  if(permission.role.name == "User" && permission.role.permissions.includes("create") && permission.role.permissions.includes("read")) return true;
  return false;
}
