import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StandardService } from './standard.service';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService extends StandardService<User> {

  constructor(protected httpClient: HttpClient, 
              protected dialog: MatDialog,
              protected router : Router) { 
                super(httpClient, dialog, router, null)
              }

  /**
   * Recuperar senha do usuário através do email e cpf 
   * (Modal na tela de LOGIN)
   */
  public reset(user: User): Observable<any> {
    return this.put(this.backendURL +  "/userpassword/ResetPassword", user);
  }

  /**
   * Altera senha do usuário no primeiro acesso.
   */
  public updatePassword(user: User): Observable<any> {
    return this.put(this.backendURL +  "/userpassword", user);
  }
}
