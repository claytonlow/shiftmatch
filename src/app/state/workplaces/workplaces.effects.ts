import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadWorkplaces,
  loadWorkplacesSuccess,
  loadWorkplacesFailed,
} from './workplace.actions';
import { WorkplaceService } from '../../services/workplace.service';
import { of, from } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class WorkplacesEffects {
  constructor(
    private actions$: Actions,
    private workplaceService: WorkplaceService
  ) {}

  loadWorkplaces$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWorkplaces),
      switchMap(() =>
        from(this.workplaceService.getWorkplaces()).pipe(
          map((workplaces) => {
              return loadWorkplacesSuccess({ workplaces: workplaces})
          }),
          catchError((error) => of(loadWorkplacesFailed({ error })))
        )
      )
    )
  );
}