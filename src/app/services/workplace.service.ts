import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Workplace } from '../models/workplace';
import { getMockWorkplaces } from '../seed/workplaces';
import { addWorkplace } from '../state/workplaces/workplace.actions';

@Injectable({
  providedIn: 'root'
})
export class WorkplaceService {

  constructor(
    private store: Store
  ) { }


  async getWorkplaces() {
    // Generate mock workplace data... mimics REST request
    const workplaces:Workplace[] = getMockWorkplaces()
    return workplaces;
  }

  /**
   * Saves a workplace into the NgRx store, in the real environment, this will be an API Call
   * @param user 
   */
  async saveWorkplace(workplace: Workplace) {
    this.store.dispatch(addWorkplace({ workplace: workplace }));
  }
}
