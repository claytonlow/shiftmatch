import { RosterState } from '../models/roster';
import { UserState } from '../models/user';
import { WorkplaceState } from '../models/workplace';

export interface AppState {
  usersState: UserState;
  workplacesState: WorkplaceState;
  rostersState: RosterState
}