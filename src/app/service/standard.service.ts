import { User } from './../model/user';
import { AuthenticationService } from './auth/authentication.service';
import { YesOrNoDialogComponent } from './../shared/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { environment } from './../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StandardService<T> {
  public currentUser: User;
  readonly backendURL = environment.api_url;
  public header: HttpHeaders = new HttpHeaders();

  constructor(protected httpClient?: HttpClient, 
    protected dialog?: MatDialog,
    protected router? : Router,
    protected authenticationService?: AuthenticationService) { 
      if (this.authenticationService) {
        if (this.authenticationService.currentUserValue) {
          this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
          this.header = this.header.set('Authorization', ('Bearer ' + this.currentUser.token));
        }
      }
    }

    public get(url: string, retorno?: string): Observable<any> {
      return this.httpClient.get(url);
    }

    public put(url: string, dados: T): Observable<any> {
      return this.httpClient.put(url, dados, {responseType: 'text'});
    }

    public post(url: string, dados: T): Observable<any> {
      return this.httpClient.post(url, dados, {responseType: 'text'});
    }

    public openYesOrNoDialog(message?: string, title?: string, yesCallback?: Function) {

      const dialogConfig = new MatDialogConfig();

      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;

      dialogConfig.data = {
          title: title,
          message: message,
          yesCallback: yesCallback
      };

      this.dialog.open(YesOrNoDialogComponent, dialogConfig);
  }

  public accessControl(numberPermission: number): boolean {
    let access = false;
    if (!this.currentUser) {
      this.currentUser = <User>JSON.parse(localStorage.getItem('currentUser'));
    }

    this.currentUser.userPermissionsDto.forEach(p => {
      if (p.permissionId == numberPermission) {
        access = true;  
      } 
    });
    return access;
  }
}
