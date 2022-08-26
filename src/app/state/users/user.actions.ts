import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user';
import { CREATING_USER, FETCHED_USERS, FETCHING_USERS, FETCHING_USERS_FAILED, REMOVING_USER } from './user.types';

export const loadUsers = createAction(FETCHING_USERS);
export const loadUsersSuccess = createAction(FETCHED_USERS, props<{ users: User[] }>());
export const loadUsersFailed = createAction(FETCHING_USERS_FAILED, props<{ error: string }>())
export const addUser = createAction(CREATING_USER, props<{ user:User }>())
export const removeUser = createAction(REMOVING_USER, props<{ id: string}>())