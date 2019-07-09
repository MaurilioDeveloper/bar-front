import { EnumPermission } from './../enum/permission.enum';
import { AuthenticationService } from './auth/authentication.service';
import { YesOrNoDialogComponent } from './../shared/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { StandardService } from './standard.service';
import { Router } from '@angular/router';
import { Company } from './../model/company';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService extends StandardService<Company>{

  public load: BehaviorSubject<Company> = new BehaviorSubject<Company>(new Company());

  constructor(protected httpClient: HttpClient, 
              protected dialog: MatDialog,
              protected router : Router,
              protected authenticationService: AuthenticationService) { 
                super(httpClient, dialog, router, authenticationService)
              }

  /**
   * Cria um parceiro (Empresa) e um usuário de primeiro
   * acesso, para acessar o Portal
   */
  public saveCompany(company: Company): Observable<any> {
    return this.post(this.backendURL +  "/company", company);
  }

  /**
   * Atualiza um parceiro (Empresa) e o primeiro usuariomaster
   * Este endpoint não envia EMAIL
   */
  public updateCompanyBasic(company: Company): Observable<any> {
    return this.put(this.backendURL +  "/company/UpdateCompanyBasic", company);
  }

  /**
   * atualiaza um parceiro (Empresa) e o primeiro usuariomaster
   */
  public updateCompany(company: Company): Observable<any> {
    return this.put(this.backendURL +  "/company", company);
  }

  /**
   * Busca empresa pelo CNPJ
   */
  public getCompany(cnpj: string): Observable<any> {
    return this.get(this.backendURL +  "/company/GetCompanieByMaster/" + cnpj);
  }

  /**
   * Busca empresa pelo ID
   */
  public getCompanyById(id: number): Observable<any> {
    return this.get(this.backendURL +  "/company/" + id);
  }

  /**
   * Busca empresa pelo CNPJ no backend, pelo qual busca dados
   * na Receita.
   */
  public getCompanyInReceita(cnpj: string): Observable<any> {
    return this.get(this.backendURL + "/wsreceita/" + cnpj);
  }

  /**
   * Busca empresas (parceiros) para preencher o combo
   * para ser selecionado na tela de cadastro de Usuários.
   * //TODO será necessario alterar este endpoint para
   * buscar somente os parceiros que estão abaixo do usuário
   * que está logado no sistema.
   * Obs: Endpoint retornará somente o ID e o Nome do Parceiro.
   */
  public getCompanies() {
    return this.get(this.backendURL + "/company");
  }
}
