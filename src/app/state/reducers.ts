import { rosterReducer } from "./roster/roster.reducer";
import { userReducer } from "./users/user.reducer";
import { workplaceReducer } from "./workplaces/workplaces.reducer";

/**
 * Combines all reducers into one variable for reference within app.module
 */
export const reducers = {
    usersState: userReducer,
    workplacesState: workplaceReducer,
    rostersState: rosterReducer
}