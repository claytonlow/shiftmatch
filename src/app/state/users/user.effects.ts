import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addUser,
  removeUser,
  loadUsers,
  loadUsersSuccess,
  loadUsersFailed,
} from './user.actions';
import { UserService } from '../../services/user.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class UsersEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private userService: UserService
  ) {}

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        from(this.userService.getUsers()).pipe(
          map((users) => {
              return loadUsersSuccess({ users: users})
          }),
          catchError((error) => of(loadUsersFailed({ error })))
        )
      )
    )
  );
}