import { MessageToastService } from './../../../service/message-toast.service';
import { CpfCnpjValidator } from './../../../util/cpf-cnpj-validator';
import { Validators, FormControl } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { User } from 'src/app/model/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ResetPasswordService } from 'src/app/service/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  //Dialog
  title: string;
  message: string;

  //Instancias
  public user: User = new User();

  //Form Control
  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public cpfControl = new FormControl('', [Validators.required, Validators.minLength(11), CpfCnpjValidator.valida_cpf]);

  yesCallback: Function;
  noCallback: Function;

  constructor(private dialogRef: MatDialogRef<ResetPasswordComponent>, @Inject(MAT_DIALOG_DATA) data,
              private resetPasswordService: ResetPasswordService,
              private toastService: MessageToastService) {
    this.title = data.title;
    this.message = data.message;
    this.yesCallback = data.yesCallback;
    this.noCallback = data.noCallback;
  }

  ngOnInit() {
  }

  reset() {
    this.resetPasswordService.reset(this.user).subscribe(
      result => {
        this.toastService.showMsgSuccess(result);
        this.close();
      }, 
      error => {
        this.toastService.showMsgError(error.error);
      }
    )
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
