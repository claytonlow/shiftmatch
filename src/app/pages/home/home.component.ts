import { Component, OnInit } from '@angular/core';
import { MtxDrawer } from '@ng-matero/extensions/drawer';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { DrawerComponent } from 'src/app/components/roster/drawer/drawer.component';
import { RosterDay } from 'src/app/models/roster';
import { Shift } from 'src/app/models/shift';
import { Workplace } from 'src/app/models/workplace';
import { AppState } from 'src/app/state/app.state';
import { selectAllRosters } from 'src/app/state/roster/roster.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  rows$ = this.store.select(selectAllRosters)

  dateRange = this.currentWeek()
  dateHeaders:Date[] = []

  constructor(private drawer: MtxDrawer, public store: Store<AppState>) { 
    // Builds the initial state of the scheduler
    this.buildCurrentWeek()
  }

  ngOnInit(): void {
  }
  
  /**
   * Presents the slide out drawer and passes over relevant data
   * @param date 
   * @param rosteredDay 
   */
  openDrawer(date: string, rosteredDay: any) {
    const drawerRef = this.drawer.open(DrawerComponent, {
      position: 'right',
      width: '500px',
      hasBackdrop: true,
      closeOnNavigation: true,
      data: {date, rosteredDay},
    });
  }

  /**
   * Builds seven days based off the start of the date range specified
   */
  buildCurrentWeek() {
    this.dateHeaders = []
    for(let i=0;i<7;i++) {
      this.dateHeaders.push(moment(this.dateRange[0]).add(i, 'days').toDate())
    }
  }

  /**
   * Returns an array with the current date and 7 days into the future
   */
  currentWeek() {
    return [moment().toDate(), moment().add(7, 'days').toDate()]
  }

  /**
   * Rebuilds the scheduler to show the current week
   */
  setToCurrentWeek() {
    this.dateRange = this.currentWeek();
    this.buildCurrentWeek()
  }

  /**
   * Rebuilds the scheduler for the next week ahead
   */
  nextWeek() {
    this.dateRange = [
      moment(this.dateRange[1]).add(1, 'days').toDate(), 
      moment(this.dateRange[1]).add(7, 'days').toDate()
    ]
    this.buildCurrentWeek()
  }

  /**
   * Rebuilds the scheduler for the previous week
   */
  previousWeek() {
    this.dateRange = [
      moment(this.dateRange[0]).add(-7, 'days').toDate(),
      moment(this.dateRange[0]).add(-1, 'days').toDate() 
    ]
    this.buildCurrentWeek()
  }

  /**
   * Self explanatory
   */
  notAvailableInDemo() {
    alert('Outside the scope of this demo')
  }

  /**
   * @TODO
   * In the future, this will be used to display a calendar dialog to jump to future/previous dates 
   * more easily
   */
  showCalendar() {
    this.notAvailableInDemo()
  }

  /**
   * @TODO
   * In the future, this will be used to display a filter dialog to filter the scheduler content
   */
  showFilterDialog() {
    this.notAvailableInDemo()
  }

  /**
   * Renders the text used within the placement cell
   * @param shifts 
   * @returns 
   */
  renderPlacement(shifts: Shift[]) {
    if (shifts && shifts.length > 0) {
      let filled = 0;
      shifts.forEach((shift) => {
        if (shift.user_id) {
          filled++
        }
      })

      return `${filled}/${shifts.length}`
    } else {
      return '--'
    }
  }

  /**
   * Renders the classes used within the placement cell
   * @param shifts 
   * @returns 
   */
  schedulerTableCellClass(shifts: Shift[]) {
    if (shifts && shifts.length > 0) {
      let filled = 0;
      shifts.forEach((shift) => {
        if (shift.user_id) {
          filled++
        }
      })

      return shifts.length > 0 && filled === shifts.length ? 'roster-no-shortfalls' : 'roster-has-shortfalls'
    } else {
      return ''
    }
  }
}
