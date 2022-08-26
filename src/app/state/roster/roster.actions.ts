import { createAction, props } from '@ngrx/store';
import { RosterDay } from 'src/app/models/roster';
import { Shift } from 'src/app/models/shift';
import { 
    ADD_SHIFTS_TO_ROSTER, 
    ADD_TO_ROSTER, 
    CREATING_ROSTER, 
    FETCHED_ROSTERS, 
    FETCHING_ROSTERS, 
    FETCHING_ROSTERS_FAILED, 
    REMOVING_ROSTER 
} from './roster.types';

export const loadRosters = createAction(FETCHING_ROSTERS);
export const loadRostersSuccess = createAction(FETCHED_ROSTERS, props<{ rosters: RosterDay[] }>());
export const loadRostersFailed = createAction(FETCHING_ROSTERS_FAILED, props<{ error: string }>())
export const addRoster = createAction(CREATING_ROSTER, props<{ roster:RosterDay }>())
export const addShiftToRoster = createAction(ADD_TO_ROSTER, props<{ id: string, shift:Shift }>())
export const addShiftsToRoster = createAction(ADD_SHIFTS_TO_ROSTER, props<{ id: number, date: string, shifts:Shift[] }>())
export const removeRoster = createAction(REMOVING_ROSTER, props<{ id: string}>())