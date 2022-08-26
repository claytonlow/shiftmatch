import { Injectable } from '@angular/core';
import { generateUser, generateUsers } from '../seed/users';
import { User } from '../models/user';
import { Store } from '@ngrx/store';
import { FETCHING_USERS } from '../state/users/user.types';
import { addUser, loadUsers, loadUsersSuccess } from '../state/users/user.actions';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private store: Store
  ) { }


  async getUsers() {
    // Generate mock user data... mimics REST request
    const users:User[] = generateUsers(10)
    return users;
  }

  /**
   * Saves a user into the NgRx store, in the real environment, this will be an API Call
   * @param user 
   */
  async saveUser(user: User) {
    this.store.dispatch(addUser({ user: user }));
  }

}
