import { AfterContentChecked, ChangeDetectorRef, Component, ElementRef, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shift } from 'src/app/models/shift';
import {FormControl, 
  FormGroup,
  FormBuilder,
  FormArray,
  Validators} from '@angular/forms';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectAllUsers } from 'src/app/state/users/user.selectors';
import * as moment from 'moment';

@Component({
  selector: 'app-shift-form',
  templateUrl: './shift-form.component.html',
  styleUrls: ['./shift-form.component.scss']
})
export class ShiftFormComponent implements OnInit, AfterContentChecked {
  title: string = 'Add a shift';
  emptyShift: Shift = {
    start_datetime: new Date(),
    end_datetime: new Date(),
  }
  
  shiftForm: FormGroup | undefined

  users = this.store.select(selectAllUsers)
  canAddShift = true

  constructor(
    public dialogRef: MatDialogRef<ShiftFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Shift,
    private fb: FormBuilder,
    private store: Store<AppState>,
    private changeDetector: ChangeDetectorRef
  ) {
    this.shiftForm = this.fb.group({
      shifts: this.fb.array([], Validators.required)
    })
  }

  ngAfterContentChecked() : void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    // If there was data passed over to this dialog, lets add that to the form builder
    if (this.data) {
      this.title = 'Update shift'
      this.shifts.push(this.fb.group({
        id: [this.data.id],
        start_datetime: [moment(this.data.start_datetime).format('HH:mm'), Validators.required],
        end_datetime: [moment(this.data.end_datetime).format('HH:mm'), Validators.required],
        profession_id: [this.data.profession_id],
        workplace_id: [this.data.workplace_id],
        user_id: [this.data.user_id]
      }))

      // Since data has been passed over, we consider this an edit action
      // So we'll disable the ability to add any additional shifts
      this.canAddShift = false
    } else {

      // No data has been passed to the dialog, so lets add the first shift entry
      this.addShift()
    }
  }
  
  // Getter method to pull the shifts array out from the form
  get shifts():FormArray{
    return <FormArray> this.shiftForm!.get('shifts');
  }

  /**
   * Creates an empty shift in FormBuilder
   * @returns FormGroup
   */
  createShift(): FormGroup {
    return this.fb.group({
      start_datetime: ['', Validators.required],
      end_datetime: ['', Validators.required],
      profession_id: [''],
      workplace_id: [''],
      user_id: ['']
    })
  }

  /**
   * Adds a newly minted shift into the shifts controls
   * @returns FormGroup
   */
  addShift() {
    this.shifts.push(this.createShift())
  }

  /**
   * ACtually doesnt save the shifts here, but passes back to the parent to handle the saving
   */
  saveShifts() {
    // Check if the form is valid based on the FormGroup Validators
    if (this.shiftForm!.valid) {
      this.dialogRef.close(this.shifts.controls.map((formGroup: any) => formGroup.value))
    }
  }

}
