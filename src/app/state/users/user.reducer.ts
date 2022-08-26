import { faker } from "@faker-js/faker";
import { createReducer, on } from "@ngrx/store";
import { UserState } from "src/app/models/user";
import { addUser, loadUsers, loadUsersFailed, loadUsersSuccess, removeUser } from "./user.actions";


export const initialUserState: UserState = {
    users: [],
    error: null,
    status: 'pending'
}

/**
 * Simple reducer to handle state and data
 */
export const userReducer = createReducer(
    initialUserState,
    on(addUser, (state, { user }) => ({
        ...state,
        users: [...state.users, user]
    })),
    on(removeUser, (state, { id }) => ({
        ...state,
        users: state.users.filter((user) => user.id !== id)
    })),
    on(loadUsers, (state) => ({ ...state, status: 'loading', 'error': null })),
    on(loadUsersSuccess, (state, { users }) => ({ ...state, users: users, status: 'success', 'error': null })),
    on(loadUsersFailed, (state, { error }) => ({ ...state, status: 'error', error: error }))
)