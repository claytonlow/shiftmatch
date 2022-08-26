import { createSelector } from '@ngrx/store';
import { UserState } from 'src/app/models/user';
import { AppState } from '../app.state';


export const selectUsers = (state: AppState) => state.usersState;

/**
 * Selects all users from the store and returns as array
 */
export const selectAllUsers = createSelector(
    selectUsers,
  (state: UserState) => {
      return state.users
  }
);

/**
 * Selects all users from the store and mutates into an object for easy reference within application
 */
export const selectAllUsersById = createSelector(
    selectUsers,
  (state: UserState) => {
      let user: any = {}
      state.users.forEach((u) => {
          user[u.id] = { ...u }
      })

      return user
  }
);