export function isAdmin(roles: string[]): boolean {
  return roles.indexOf('ROLE_ADMIN') >= 0;
}
