import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { faker } from '@faker-js/faker';
import { MtxDrawerRef } from '@ng-matero/extensions/drawer';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { Shift } from 'src/app/models/shift';
import { Workplace } from 'src/app/models/workplace';
import { RosterService } from 'src/app/services/roster.service';
import { AppState } from 'src/app/state/app.state';
import { selectAllRostersById } from 'src/app/state/roster/roster.selectors';
import { selectAllUsersById } from 'src/app/state/users/user.selectors';
import { ShiftFormComponent } from '../modals/shift-form/shift-form.component';

@Component({
  selector: 'app-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent implements OnInit, OnDestroy {
  workplace: Workplace | undefined
  shifts: Shift[] | undefined
  data: any;
  now = new Date()

  users$: Subscription | undefined
  usersById: any | undefined
  rosters$: Subscription | undefined
  rostersById: any | undefined

  constructor(
    public store: Store<AppState>,
    public drawerRef: MtxDrawerRef<DrawerComponent>,
    public dialog: MatDialog,
    private rosterService: RosterService,
  ) { 

    //Subscribe to users store, returns as object with the user id as the key for easy of reference    
    this.users$ = this.store.select(selectAllUsersById).subscribe((users) => {      
      this.usersById = users;
    })

    //Subscribe to rosters store, returns as object with the user id as the key for easy of reference
    this.rosters$ = this.store.select(selectAllRostersById).subscribe((rosters) => {      
      this.rostersById = rosters;
    })
  }

  ngOnInit(): void {
    // Pull the data out that's been passed in
    this.data = this.drawerRef.containerInstance.drawerConfig.data
    this.workplace = this.data.rosteredDay.workplace
    this.shifts = this.data.rosteredDay.shifts[this.data.date] ?? []
  }

  ngOnDestroy(): void {
      // Unsubscribe from the observables to remove the risk of memory leaks
      this.users$?.unsubscribe()
      this.rosters$?.unsubscribe()
  }

  onClose() {
    // Dismiss the drawer
    this.drawerRef.dismiss();
  }

  /**
   * Displays the shift form dialog and handles actions once the dialog is closed
   * @param shift 
   */
  presentShiftForm(shift?: any) {
    const dialogRef = this.dialog.open(ShiftFormComponent, {
      data: shift
    })

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;

      /**
       * A bit of data manipulation, only here purely because of the mock data
       * Won't be needed when working with real REST API
       */
      this.shifts = [
        // Removes the old shift data and replaces it with the incoming
        ...this.shifts!.filter((shift) => !result.map((r: Shift) => {
            return r.id
          }).includes(shift.id)
        ), 
        ...result.map((r: Shift) => {
          return {
            ...r,
            id: r.id ?? parseInt(faker.random.numeric(3)), // Faker used here, purely because of the mockdata
            workplace_id: this.workplace?.id,
            start_datetime: moment(`${this.data.date}  ${r.start_datetime}`, 'YYYY-MM-DD HH:mm').toDate(),
            end_datetime: moment(`${this.data.date}  ${r.end_datetime}`, 'YYYY-MM-DD HH:mm').toDate(),
          }
        })
      ]

      // Save the new shifts array to the roster
      this.rosterService.saveShiftsToRoster(this.data.rosteredDay.id,this.data.date, this.shifts)
    });
  }

}
