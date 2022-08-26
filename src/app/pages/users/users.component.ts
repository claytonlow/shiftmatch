import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectAllUsers } from 'src/app/state/users/user.selectors';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public allUsers$ = this.store.select(state => state.usersState.users)

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.allUsers$.subscribe((user) => {
      
    })
  }

}
