import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-yes-or-no-dialog',
  templateUrl: './yes-or-no-dialog.component.html',
  styleUrls: ['./yes-or-no-dialog.component.scss']
})
export class YesOrNoDialogComponent implements OnInit {

  title: string;
  message: string;

  yesCallback: Function;
  noCallback: Function;

  constructor(private dialogRef: MatDialogRef<YesOrNoDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
      this.title = data.title;
      this.message = data.message;
      this.yesCallback = data.yesCallback;
      this.noCallback = data.noCallback;
    }

  ngOnInit() {
  }

  yes() {
    if (typeof this.yesCallback === 'function') {
      this.yesCallback();
    }
    this.close();
  }

  no() {
    if (typeof this.noCallback === 'function') {
      this.noCallback();
    }
    this.close();
  }

  private close() {
    this.dialogRef.close();
  }


}
