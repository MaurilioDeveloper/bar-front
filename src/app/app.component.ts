import { AuthenticationService } from './service/auth/authentication.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './model/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentUser: User;

  constructor(public router: Router, public authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  public verifyAccessLayoutComponents(): boolean {
    if (this.router.url !== "/login" && this.router.url !==  "/" && this.router.url !== "/alter-password") {
      return true;
    } 
    return false;
  }
}
