import { AlterPasswordComponent } from './component/alter-password/alter-password.component';
import { AuthGuard } from './service/auth/auth-guard';
import { CreateUserComponent } from './component/user/create-user/create-user.component';
import { CreateCompanyComponent } from './component/company/create-company/create-company.component';
import { CompanyComponent } from './component/company/company.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FinanceiroComponent } from './component/financeiro/financeiro.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ConfirmFirstAccessComponent } from './component/confirm-first-access/confirm-first-access.component';

const routes: Routes = [
  { path: '', component: LoginComponent, data: {
    breadcrumb: [
      { label: 'Barigui', path: 'login' }
    ]
  }},
  { path: 'login', component: LoginComponent, data: {
    breadcrumb: [
      { label: 'Barigui', path: 'login' }
    ]
  }},
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent, data: {
    breadcrumb: [
      { label: 'Home', path: 'home' }
    ]
  }},
  { path: 'financeiro', canActivate: [AuthGuard], component: FinanceiroComponent, data: {
    breadcrumb: [
      { label: 'Financeiro', path: 'financeiro' }
    ]
  }},
  { path: 'company', canActivate: [AuthGuard], component: CompanyComponent, data: {
    breadcrumb: [
      { label: 'Parceiro', path: 'company' }
    ]
  }},
  { path: 'create-company', canActivate: [AuthGuard], component: CreateCompanyComponent, data: {
    breadcrumb: [
      { label: 'Cadastrar Parceiro', path: 'create-company' }
    ]
  }},
  { path: 'create-user', canActivate: [AuthGuard], component: CreateUserComponent, data: {
    breadcrumb: [
      { label: 'Cadastrar Usuário', path: 'create-user' }
    ]
  }},
  { path: 'alter-password', canActivate: [AuthGuard], component: AlterPasswordComponent, data: {
    breadcrumb: [
      { label: 'Alterar Senha', path: 'create-user' }
    ]
  }},
  { path: 'confirm-first-access', canActivate: [AuthGuard], component: ConfirmFirstAccessComponent, data: {
    breadcrumb: [
      { label: 'Confirmar dados de Primeiro Acesso', path: 'confirm-first-access' }
    ]
  }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
