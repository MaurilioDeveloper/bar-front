import { MatDialogConfig, MatDialog } from '@angular/material';
import { MessageToastService } from 'src/app/service/message-toast.service';
import { AuthenticationService } from './../../service/auth/authentication.service';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from './../../model/user';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { Navigate } from 'src/app/util/navigate';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  //Instancias
  public user: User = new User();

  //Elemento DOM (Tela)
  @ViewChild('emailLogin', { read: ElementRef }) emailLogin: ElementRef;

  //Validações
  public loginForm = this.formBuilder.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  //Retorno e erro
  public returnUrl: string;
  public error: string = '';
  public emailValid: boolean = false;

  constructor(public authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private toastService: MessageToastService,
    private dialog?: MatDialog) { }

  ngOnInit() {
    if (this.authenticationService.currentUserValue) {
      return Navigate.redirect('/home', this.router);
    }
  }
  
  validateEmail(event: any) {
    if (event.target.value) {
      let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (regex.test(String(event.target.value).toLowerCase())) {
        this.error = '';
        this.emailValid = true;
        return true;
      }

      this.emailValid = false;
      this.error = 'Email Inválido';
      this.toastService.showMsgError('Email Inválido');
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    this.authenticationService.login(this.f.email.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.error = error.error;
          this.emailLogin.nativeElement.style.border = '1px solid red !important';
          this.toastService.showMsgError(this.error);
        });
  }

  public resetPassword(yesCallback?: Function) {

    let headerModal = '';
    let msgConfirm = 'Informe o email e cpf para recuperar a senha';

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        title: headerModal,
        message: msgConfirm,
        yesCallback: false
    };

    this.dialog.open(ResetPasswordComponent, dialogConfig);
}
}
