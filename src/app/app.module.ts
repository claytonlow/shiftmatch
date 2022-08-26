import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list'
import { MatGridListModule } from '@angular/material/grid-list';
import { CalendarComponent } from './components/calendar/calendar/calendar.component';
import { StoreModule } from '@ngrx/store';
import { UsersComponent } from './pages/users/users.component';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './state/users/user.effects';
import { reducers } from './state/reducers';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IconChevronLeft, IconChevronRight, IconChevronDown, IconX, IconArrowBarRight, IconPlus } from 'angular-tabler-icons/icons';
import { MtxDrawerModule } from '@ng-matero/extensions/drawer';
import { DrawerComponent } from './components/roster/drawer/drawer.component';
import { ShiftFormComponent } from './components/roster/modals/shift-form/shift-form.component';
import { MatDialogModule } from '@angular/material/dialog'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { ReactiveFormsModule } from '@angular/forms';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { WorkplacesEffects } from './state/workplaces/workplaces.effects';
import { RostersEffects } from './state/roster/roster.effects';
import { FormatDatesPipe } from './pipes/format-dates.pipe';
import { SortByPipe } from './pipes/sort-by.pipe';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Tabler icons used within application
const icons = {
  IconChevronLeft, 
  IconChevronRight,
  IconChevronDown,
  IconX,
  IconArrowBarRight,
  IconPlus
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CalendarComponent,
    UsersComponent,
    DrawerComponent,
    ShiftFormComponent,
    FormatDatePipe,
    FormatDatesPipe,
    SortByPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,    

    // Material Components
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,

    // Third party extension for the slideout drawer
    MtxDrawerModule,

    // NgRx Store
    StoreModule.forRoot(reducers, {}),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
    }),
    EffectsModule.forRoot([UsersEffects, WorkplacesEffects, RostersEffects]),
    
    // Tabler icons pack for better looking icons
    TablerIconsModule.pick(icons),
    ReactiveFormsModule,
    
  ],
  providers: [
    
  ],
  bootstrap: [AppComponent],
  exports: [
    TablerIconsModule
  ]
})
export class AppModule { }
