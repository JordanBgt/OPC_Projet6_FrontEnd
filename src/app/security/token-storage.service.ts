import { Injectable } from '@angular/core';

/**
 * Service to manages token and user information inside Browser's Session Storage
 */

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  /**
   * Method to clear the Session Storage
   */
  signout() {
    window.sessionStorage.clear();
  }

  /**
   * Method to save the token in the Session Storage
   * @param token the token to save
   */
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  /**
   * Method to get the token saved in the Session Storage
   */
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  /**
   * Method to save user's informations in the Session Storage
   * @param user user's informations to save
   */
  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  /**
   * Method to get the user saved in the Session Storage
   */
  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}
