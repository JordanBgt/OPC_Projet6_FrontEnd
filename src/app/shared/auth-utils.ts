/**
 * Check if the array of roles contains 'ROLE_ADMIN'
 * @param roles array of user's roles
 */
export function isAdmin(roles: string[]): boolean {
  return roles.indexOf('ROLE_ADMIN') >= 0;
}
