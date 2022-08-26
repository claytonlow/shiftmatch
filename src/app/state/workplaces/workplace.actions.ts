import { createAction, props } from '@ngrx/store';
import { Workplace } from 'src/app/models/workplace';
import { CREATING_WORKPLACE, FETCHED_WORKPLACES, FETCHING_WORKPLACES, FETCHING_WORKPLACES_FAILED, REMOVING_WORKPLACE } from './workplaces.types';

export const loadWorkplaces = createAction(FETCHING_WORKPLACES);
export const loadWorkplacesSuccess = createAction(FETCHED_WORKPLACES, props<{ workplaces: Workplace[] }>());
export const loadWorkplacesFailed = createAction(FETCHING_WORKPLACES_FAILED, props<{ error: string }>())
export const addWorkplace = createAction(CREATING_WORKPLACE, props<{ workplace:Workplace }>())
export const removeWorkplace = createAction(REMOVING_WORKPLACE, props<{ id: string}>())