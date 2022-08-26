import { createSelector } from '@ngrx/store';
import { Workplace, WorkplaceState } from 'src/app/models/workplace';
import { AppState } from '../app.state';


export const selectWorkplaces = (state: AppState) => state.workplacesState;

/**
 * Selects all workplaces from the store and returns an array
 */
export const selectAllWorkplaces = createSelector(
    selectWorkplaces,
  (state: WorkplaceState) => {
    return state.workplaces
  }
);
