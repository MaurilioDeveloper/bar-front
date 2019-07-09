import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthenticationService } from './auth/authentication.service';
import { StandardService } from './standard.service';
import { Injectable } from '@angular/core';
import { Permission } from '../model/permission';

@Injectable({
  providedIn: 'root'
})
export class PermissionService extends StandardService<Permission>{

  constructor(protected httpClient: HttpClient,
    protected router : Router,
    protected authenticationService: AuthenticationService) { 
      super(httpClient, null, router, authenticationService)
  }

  /**
   * Busca permissões que este usuário poderá atrelar a outro 
   * usuário.
   */
  public getPermissions(): Observable<any> {
    return this.get(this.backendURL +  "/permission");
  }

}
