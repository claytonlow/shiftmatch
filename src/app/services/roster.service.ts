import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { RosterDay } from '../models/roster';
import { Shift } from '../models/shift';
import { getMockRoster } from '../seed/roster';
import { addRoster, addShiftsToRoster, loadRosters } from '../state/roster/roster.actions';

@Injectable({
  providedIn: 'root'
})
export class RosterService {

  constructor(
    private store: Store
  ) { }

  async getRoster() {
    // Generate mock roster data... mimics REST request
    const roster:RosterDay[] = getMockRoster()
    return roster;
  }

  /**
   * Creates a rostered day in the NgRx store
   * @param rosteredDay 
   */
  async createRosteredDay(rosteredDay: RosterDay) {
    this.store.dispatch(addRoster({ roster: rosteredDay }));
    //this.store.dispatch(loadRosters())
  }

  /**
   * Saves shifts into a rosteredDay within the NgRx store
   * @param rosteredDay 
   */
  async saveShiftsToRoster(id: number, date: string, shifts: Shift[]) {
    this.store.dispatch(addShiftsToRoster({id, date, shifts}));
  }
}
