import { createReducer, on } from "@ngrx/store";
import { WorkplaceState } from "src/app/models/workplace";
import { addWorkplace, loadWorkplaces, loadWorkplacesFailed, loadWorkplacesSuccess, removeWorkplace } from "./workplace.actions";


export const initialWorkplaceState: WorkplaceState = {
    workplaces: [],
    error: null,
    status: 'pending'
}

/**
 * Simple reducer to handle state and data in NgRx
 */
export const workplaceReducer = createReducer(
    initialWorkplaceState,
    on(addWorkplace, (state, { workplace }) => ({
        ...state,
        workplaces: [...state.workplaces, workplace]
    })),
    on(removeWorkplace, (state, { id }) => ({
        ...state,
        workplaces: state.workplaces.filter((workplace) => workplace.id !== id)
    })),
    on(loadWorkplaces, (state) => ({ ...state, status: 'loading', 'error': null })),
    on(loadWorkplacesSuccess, (state, { workplaces }) => ({ ...state, workplaces: workplaces, status: 'success', 'error': null })),
    on(loadWorkplacesFailed, (state, { error }) => ({ ...state, status: 'error', error: error }))
)