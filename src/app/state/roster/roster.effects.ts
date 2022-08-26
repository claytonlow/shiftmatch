import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadRosters,
  loadRostersSuccess,
  loadRostersFailed,
} from './roster.actions';
import { RosterService } from '../../services/roster.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class RostersEffects {
  constructor(
    private actions$: Actions,
    private rosterService: RosterService
  ) {}

  loadRosters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRosters),
      switchMap(() =>
        from(this.rosterService.getRoster()).pipe(
          map((rosters) => {
              return loadRostersSuccess({ rosters: rosters})
          }),
          catchError((error) => of(loadRostersFailed({ error })))
        )
      )
    )
  );
}