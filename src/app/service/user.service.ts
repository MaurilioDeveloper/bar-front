import { AuthenticationService } from './auth/authentication.service';
import { StandardService } from './standard.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends StandardService<User> {

  public load: BehaviorSubject<User> = new BehaviorSubject<User>(new User());

  constructor(protected httpClient: HttpClient, 
              protected dialog: MatDialog,
              protected router : Router,
              protected authenticationService: AuthenticationService) { 
                super(httpClient, dialog, router, authenticationService)
              }

  /**
   * Cria um usuário vinculado a uma empresa (parceiro)
   */
  public saveUser(user: User): Observable<any> {
    return this.post(this.backendURL +  "/user", user);
  }

  /**
   * Atualiza dados do usuário vinculado a uma empresa (parceiro)
   */
  public updateUser(user: User): Observable<any> {
    return this.put(this.backendURL +  "/user", user);
  }

  public getUser(id: string): Observable<any> {
    return this.get(this.backendURL + "/user/" + id);
  }
}
