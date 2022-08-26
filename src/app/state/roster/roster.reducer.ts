import { faker } from "@faker-js/faker";
import { createReducer, on } from "@ngrx/store";
import { RosterState } from "src/app/models/roster";
import { addRoster, addShiftsToRoster, addShiftToRoster, loadRosters, loadRostersFailed, loadRostersSuccess, removeRoster } from "./roster.actions";


export const initialRosterState: RosterState = {
    rosters: [],
    error: null,
    status: 'pending'
}

/**
 * Reducer to handle the data changes to the NgRx store
 */
export const rosterReducer = createReducer(
    initialRosterState,
    on(addRoster, (state, { roster }) => ({
        ...state,
        rosters: [...state.rosters, roster]
    })),
    on(removeRoster, (state, { id }) => ({
        ...state,
        rosters: state.rosters.filter((roster) => roster.id !== id)
    })),
    on(loadRosters, (state) => ({ ...state, status: 'loading', 'error': null })),
    on(loadRostersSuccess, (state, { rosters }) => ({ ...state, rosters: rosters, status: 'success', 'error': null })),
    on(loadRostersFailed, (state, { error }) => ({ ...state, status: 'error', error: error })),
    on(addShiftToRoster, (state, { id, shift }) => ({ 
        ...state, 
        rosters: state.rosters.map((day) => {
            if (day.id === id) { 
                day.shifts.push(shift) 
            }
            return day
        }),
        status: 'success', 
        error: null 
    })),
    on(addShiftsToRoster, (state, { id, date, shifts }) => ({ 
        ...state, 
        rosters: state.rosters.map((day) => {
            let updated = { ...day }
            if (updated.id === id) { 
                updated.shifts = [
                    ...day.shifts.filter((shift) => {
                        return !shifts.map((s) => {
                            return s.id
                        }).includes(shift.id)
                    }), 
                    ...shifts
                ]
            }
            return updated
        }),
        status: 'success', 
        error: null 
    })),
    
)