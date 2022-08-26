import { createSelector } from '@ngrx/store';
import * as moment from 'moment';
import { RosterDay, RosterState } from 'src/app/models/roster';
import { UserState } from 'src/app/models/user';
import { WorkplaceState } from 'src/app/models/workplace';
import { AppState } from '../app.state';
import { selectUsers } from '../users/user.selectors';
import { selectAllWorkplaces, selectWorkplaces } from '../workplaces/workplace.selectors';


export const selectRosters = (state: AppState) => state.rostersState;

/**
 * Selects all rosters and returns array
 */
export const selectAllRosters = createSelector(
    selectRosters,
    selectWorkplaces,
    selectUsers,
  (state: RosterState, workplaceState: WorkplaceState, userState: UserState) => {
      return state.rosters.map((rosteredDay) => {

        let shifts: any = {}

        rosteredDay.shifts.forEach((shift: any) => {
          let key = moment(shift.start_datetime).format('YYYY-MM-DD')
          if (!shifts[key]) {
            shifts[key] = []
          }  
          shifts[key].push(shift)
        })

        return {
          ...rosteredDay,
          workplace: workplaceState.workplaces.find((workplace) => workplace.id === rosteredDay.workplace_id),
          shifts: shifts
          //shifts: {
          //   [day]: rosteredDay.shifts.map((shift) => {
          //     return {
          //       ...shift , 
          //       user: userState.users.find((user) => shift.user_id === user.id )}
          //     })
          // }
        }
      })
  }
);

/**
 * Selects all rosters from the store and mutates into an object for easy reference within application
 */
export const selectAllRostersById = createSelector(
    selectRosters,
  (state: RosterState) => {
      let roster: any = {}
      state.rosters.forEach((u) => {
        roster[u.id] = { ...u }
      })

      return roster
  }
);


//export const selectRoster = (state: AppState) => state.rosters.rosters.find((roster: Roster) => roster.id === );
