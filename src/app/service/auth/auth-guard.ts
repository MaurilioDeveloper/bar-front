import { CompanyService } from './../company.service';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { EnumPermission } from 'src/app/enum/permission.enum';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private companyService: CompanyService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            console.log(currentUser);
            /**
             * Validação de controle de acesso as telas (rotas)
             * se podem ou não serem acessadas, conforme a 
             * permissão que este usuário possui.
             */

            if (route.routeConfig.path == 'login' || route.routeConfig.path == '') {
                return this.redirectHome();
            }

            if (route.routeConfig.path == 'create-user') {
                if (this.companyService.accessControl(EnumPermission.AdmCreatUser)) {
                    //Usuário possui permissão
                    return true;
                }
                return this.redirectHome();
            }
            if (route.routeConfig.path == 'create-company') {
                if (this.companyService.accessControl(EnumPermission.AdmCreatCompany)) {
                    //Usuário possui permissão
                    return true;
                } 
                return this.redirectHome();
            }

            if (route.routeConfig.path == 'alter-password') {
                if (!currentUser.changedPassword) {
                    return true
                }
                return this.redirectHome();
            }

            if (!currentUser.changedPassword && route.routeConfig.path != 'alter-password') {
                //Altera senha de Primeiro acesso (usuário)
                return this.redirectChangePassword();
            }

            if (!currentUser.firstAccessCompany && route.routeConfig.path != 'confirm-first-access') {
                //Confirma dados de Primeiro acesso (usuário)
                return this.redirectConfirmData();
            }
            /**
             * ================= Fim Validação Permissões do Usuário ===================
             */


            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }

    private redirectHome() {
        return this.router.navigate(['/home']);
        // return false;
    }

    private redirectChangePassword() {
        return this.router.navigate(['/alter-password']);
    }

    private redirectConfirmData() {
        return this.router.navigate(['/confirm-first-access']);
    }
}