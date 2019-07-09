import { UserService } from './../../service/user.service';
import { MessageToastService } from 'src/app/service/message-toast.service';
import { Router } from '@angular/router';
import { ResetPasswordService } from './../../service/reset-password.service';
import { AuthenticationService } from './../../service/auth/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/model/user';
import { Component, OnInit } from '@angular/core';
import { Navigate } from 'src/app/util/navigate';

@Component({
  selector: 'app-alter-password',
  templateUrl: './alter-password.component.html',
  styleUrls: ['../login/login.component.scss']
})
export class AlterPasswordComponent implements OnInit {

  //Instancias
  public user: User = new User();

  //Usuário Logado
  public userLogged = this.authenticationService.currentUserSubject.value;

  //Validações
  public alterPasswordForm = this.formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, 
              public authenticationService: AuthenticationService,
              private resetPassword: ResetPasswordService,
              private router: Router,
              private toastService: MessageToastService,
              private userService: UserService) { }

  ngOnInit() {
    this.findUser();
  }

  public savePassword() {
    
    this.user.id = this.userLogged.id;
    this.resetPassword.updatePassword(this.user).subscribe(
      result => {
        this.userLogged.changedPassword = true;
        this.authenticationService.currentUserSubject.next(this.userLogged);
        this.toastService.showMsgSuccess(result);
        setTimeout(() => {
          return Navigate.redirect('/home', this.router);
        }, 2000);
      },
      error => {
        
        this.toastService.showMsgError(error.error);
      }
    )
  }

  private findUser() {
    this.userService.getUser(this.userLogged.id).subscribe(
      result => {
        if ((<User>result).changedPassword) {
          this.userLogged.changedPassword = true;
          this.authenticationService.currentUserSubject.next(this.userLogged);
          return Navigate.redirect('/home', this.router);
        }
      }, 
      error => {
        
        this.toastService.showMsgError(error.error);
      }
    )
  }

}
