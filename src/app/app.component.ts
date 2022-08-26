import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { loadRosters } from './state/roster/roster.actions';
import { loadUsers } from './state/users/user.actions';
import { loadWorkplaces } from './state/workplaces/workplace.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nav = [
    {
      title: "Roster",
      url: "/roster"
    },
    {
      title: "Staff",
      url: "/staff"
    },
    {
      title: "Agency",
      url: "/agency"
    },
    {
      title: "Admin",
      url: "/admin"
    },
    {
      title: "Settings",
      url: "/settings"
    },


  ]
  constructor(private store: Store<AppState>) {
    // Load mock user data into the store
    this.store.dispatch(loadUsers())

    // Load mock workplace data into the store
    this.store.dispatch(loadWorkplaces())

    // Load mock roster data into the store
    this.store.dispatch(loadRosters())
  }

  /**
   * Checks if menu item is the current url
   * @param url 
   * @returns 
   */
  isActive(url: string) {
    return window.location.href.indexOf(url) > -1
  }
}
