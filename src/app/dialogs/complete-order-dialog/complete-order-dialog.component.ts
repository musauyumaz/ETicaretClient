import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/base-dialog';

@Component({
  selector: 'app-complete-order-dialog',
  templateUrl: './complete-order-dialog.component.html',
  styleUrls: ['./complete-order-dialog.component.scss'],
})
export class CompleteOrderDialogComponent extends BaseDialog<CompleteOrderDialogComponent> {
  constructor(
    dialogRef: MatDialogRef<CompleteOrderDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CompleteOrderDialogState
  ) {
    super(dialogRef);
  }

  complete() {}
}
export enum CompleteOrderDialogState {
  Yes,
  No,
}
