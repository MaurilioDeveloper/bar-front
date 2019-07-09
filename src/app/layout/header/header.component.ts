import { CompanyService } from './../../service/company.service';
import { EnumPermission } from './../../enum/permission.enum';
import { AuthenticationService } from './../../service/auth/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public logoPath = 'assets/images/logo.jfif';
  public currentUser: User;

  constructor(private router: Router, 
              private authenticationService: AuthenticationService,
              private companyService: CompanyService) {
    // this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  public accessMenuCompany(): boolean {
    return this.companyService.accessControl(EnumPermission.AdmCreatCompany);
  }

  public accessMenuUser(): boolean {
    return this.companyService.accessControl(EnumPermission.AdmCreatUser);
  }

  public verifyAccessMenu(): boolean {
    return this.currentUser.firstAccessCompany;
  }

}
