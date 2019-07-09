import { MaskPhone } from './../../../util/mask-phone';
import { Permission } from './../../../model/permission';
import { PermissionService } from './../../../service/permission.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { MessageToastService } from 'src/app/service/message-toast.service';
import { Company } from './../../../model/company';
import { CompanyService } from './../../../service/company.service';
import { UserService } from './../../../service/user.service';
import { CpfCnpjValidator } from './../../../util/cpf-cnpj-validator';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {

  //Formularios
  @ViewChild('form') public form: NgForm;

  //Mascaras
  public maskPhone = '(99)999999999';
  public controlMask: boolean = false;

  //Instancias
  public user: User = new User();

  //FormControl
  public nameControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public companyControl = new FormControl('', [Validators.required]);
  public emailControl = new FormControl('', [Validators.required, Validators.email]);
  public userLeaderControl = new FormControl('', []);

  //Validações
  public userForm: FormGroup = new FormGroup({
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      CpfCnpjValidator.valida_cpf,
    ])
  });

  //Listas
  public usersLeader: User[] = [];
  public companies: Company[] = [];
  public permissions: Permission[] = [];
  public permissionsPropostas: Permission[] = [];
  public permissionsFinanceiro: Permission[] = [];
  public permissionsComunicacao: Permission[] = [];
  public permissionsMarketing: Permission[] = [];
  public permissionsAdministrativo: Permission[] = [];
  public permissionsTreinamento: Permission[] = [];
  public permissionsMaster: Permission[] = [];
  public permissionsSelected: Permission[] = [];
  public permissionsSelectedPropostas: Permission[] = [];
  public permissionsSelectedAdministrativo: Permission[] = [];
  public permissionsSelectedComunicacao: Permission[] = [];
  public permissionsSelectedMarketing: Permission[] = [];
  public permissionsSelectedFinanceiro: Permission[] = [];
  public permissionsSelectedTreinamento: Permission[] = [];
  public checkAllProposta: Boolean = false;
  public checkAllAdministrativo: Boolean = false;
  public checkAllComunicacao: Boolean = false;
  public checkAllMarketing: Boolean = false;
  public checkAllFinanceiro: Boolean = false;
  public checkAllTreinamento: Boolean = false;
  public checkPermissionMaster: Boolean = false;


  //Construtor
  constructor(private userService: UserService,
    private toastService: MessageToastService,
    private companyService: CompanyService,
    private permissionService: PermissionService) { }

  //Inicio do Componente
  ngOnInit() {
    this.getCompanies();
    this.getPermissions();
  }

  public verifyDisableSave() {
    if (this.userForm.get('cpf').invalid ||
      !this.form.form.valid ||
      !this.companyControl.valid ||
      !this.emailControl.valid ||
      !this.nameControl.valid) {
      return true;
    }
    return false;
  }

  public changeMaskPhone(valor) {
    MaskPhone.applyMask(valor);
  }

  public saveUser() {

    let headerModal = '';
    let msgConfirm = 'Deseja cadastrar este usuário?';

    //Remove todos os elementos vazio do Array e adiciona Permissions.
    this.removeEmptyObjectAndAddPermission();

    this.userService.openYesOrNoDialog(msgConfirm, headerModal,
      () => {
        let user = this.user;

        this.userService.saveUser(user).subscribe(
          result => {
            
            this.toastService.showMsgSuccess(result);
            setTimeout(() => {
              window.location.reload();
            }, 3000);
          },
          error => {
            this.toastService.showMsgError(error.error);
          }
        )
      });
  }

  private getCompanies() {
    this.companyService.getCompanies().subscribe(
      result => {
        this.companies = result;
      },
      error => {
        this.toastService.showMsgError(error.error);
      }
    )
  }

  /**
   * Busca permissões que serão apresentadas na tela
   * para que o usuário possa atrela-las a outro usuário.
   */
  private getPermissions() {
    this.permissionService.getPermissions().subscribe(
      result => {
        
        this.permissions = result;
        this.permissions.forEach(permission => {
          if (permission.groupDto.description == "Propostas") {
            this.permissionsPropostas.push(permission);
          }
          if (permission.groupDto.description == "Administrativo") {
            this.permissionsAdministrativo.push(permission);
          }
          if (permission.groupDto.description == "Comunicação") {
            this.permissionsComunicacao.push(permission);
          }
          if (permission.groupDto.description == "Marketing") {
            this.permissionsMarketing.push(permission);
          }
          if (permission.groupDto.description == "Financeiro") {
            this.permissionsFinanceiro.push(permission);
          }
          if (permission.groupDto.description == "Treinamento") {
            this.permissionsTreinamento.push(permission);
          }
          if (permission.groupDto.description == "Master") {
            this.checkPermissionMaster = false;
            this.permissionsMaster.push(permission);
          }
        });
      },
      error => {
        this.toastService.showMsgError(error.error);
      }
    )
  }

  public selectCompany(value) {
    if (value) {
      this.companyService.getCompanyById(value).subscribe(
        result => {
          
          this.usersLeader = result.usersDto;
        }, 
        error => {
          
        }
      )
    }
  }

  public checkAllPermissions(event) {
    this.checkPermissionMaster = event.checked;
    this.selectAllProposta(event);
    this.selectAllComunicacao(event);
    this.selectAllAdministrativo(event);
    this.selectAllMarketing(event);
    this.selectAllFinanceiro(event);
    this.selectAllTreinamento(event);
  }

  private allCheckBoxChecked(){
    var allChecked = true;
    if (this.permissionsSelectedPropostas.length != this.permissionsPropostas.length) {
      allChecked = false;
    }
    if (this.permissionsSelectedAdministrativo.length != this.permissionsAdministrativo.length) {
      allChecked = false;
    }
    if (this.permissionsSelectedComunicacao.length != this.permissionsComunicacao.length) {
      allChecked = false;
    }
    if (this.permissionsSelectedTreinamento.length != this.permissionsTreinamento.length) {
      allChecked = false;
    }
    if (this.permissionsSelectedFinanceiro.length != this.permissionsFinanceiro.length) {
      allChecked = false;
    }
    if (this.permissionsSelectedMarketing.length != this.permissionsMarketing.length) {
      allChecked = false;
    }
    if(allChecked){
      this.checkPermissionMaster = true;
    }
  }

  public selectPermission(event, value, group) {
    if (value) {
      if (event.checked) {
        if (group == "Propostas") {
          let permission: Permission = new Permission();
          permission = value;
          permission.permissionId = value.id;
          this.permissionsSelectedPropostas.push(permission);
          if (this.permissionsSelectedPropostas.length == this.permissionsPropostas.length) {
            this.checkAllProposta = true;
          }
          this.allCheckBoxChecked();
        }
        if (group == "Administrativo") {
          let permission: Permission = new Permission();
          permission = value;
          permission.permissionId = value.id;
          this.permissionsSelectedAdministrativo.push(permission);
          if (this.permissionsSelectedAdministrativo.length == this.permissionsAdministrativo.length) {
            this.checkAllAdministrativo = true;
          }
          this.allCheckBoxChecked();
        }
        if (group == "Comunicação") {
          let permission: Permission = new Permission();
          permission = value;
          permission.permissionId = value.id;
          this.permissionsSelectedComunicacao.push(permission);
          if (this.permissionsSelectedComunicacao.length == this.permissionsComunicacao.length) {
            this.checkAllComunicacao = true;
          }
          this.allCheckBoxChecked();
        }
        if (group == "Marketing") {
          let permission: Permission = new Permission();
          permission = value;
          permission.permissionId = value.id;
          this.permissionsSelectedMarketing.push(permission);
          if (this.permissionsSelectedMarketing.length == this.permissionsMarketing.length) {
            this.checkAllMarketing = true;
          }
          this.allCheckBoxChecked();
        }
        if (group == "Treinamento") {
          let permission: Permission = new Permission();
          permission = value;
          permission.permissionId = value.id;
          this.permissionsSelectedTreinamento.push(permission);
          if (this.permissionsSelectedTreinamento.length == this.permissionsTreinamento.length) {
            this.checkAllTreinamento = true;
          }
          this.allCheckBoxChecked();
        }
        if (group == "Financeiro") {
          let permission: Permission = new Permission();
          permission = value;
          permission.permissionId = value.id;
          this.permissionsSelectedFinanceiro.push(permission);
          if (this.permissionsSelectedFinanceiro.length == this.permissionsFinanceiro.length) {
            this.checkAllFinanceiro = true;
          }
          this.allCheckBoxChecked();
        }

      } else {

        if (group == "Propostas") {
          this.checkPermissionMaster = false;
          this.checkAllProposta = false;
          let count = 0;
          this.permissionsSelectedPropostas.forEach((element: any) => {
            if (element.id == value.id) {
              this.permissionsSelectedPropostas.splice(count, 1);
              return;
            }
            count++;
          });
        }
        if (group == "Administrativo") {
          this.checkPermissionMaster = false;
          this.checkAllAdministrativo = false;
          let count = 0;
          this.permissionsSelectedAdministrativo.forEach((element: any) => {
            if (element.id == value.id) {
              this.permissionsSelectedAdministrativo.splice(count, 1);
              return;
            }
            count++;
          });
        }
        if (group == "Comunicação") {
          this.checkPermissionMaster = false;
          this.checkAllComunicacao = false;
          let count = 0;
          this.permissionsSelectedComunicacao.forEach((element: any) => {
            if (element.id == value.id) {
              this.permissionsSelectedComunicacao.splice(count, 1);
              return;
            }
            count++;
          });
        }
        if (group == "Marketing") {
          this.checkPermissionMaster = false;
          this.checkAllMarketing = false;
          let count = 0;
          this.permissionsSelectedMarketing.forEach((element: any) => {
            if (element.id == value.id) {
              this.permissionsSelectedMarketing.splice(count, 1);
              return;
            }
            count++;
          });
        }
        if (group == "Treinamento") {
          this.checkPermissionMaster = false;
          this.checkAllTreinamento = false;
          let count = 0;
          this.permissionsSelectedTreinamento.forEach((element: any) => {
            if (element.id == value.id) {
              this.permissionsSelectedTreinamento.splice(count, 1);
              return;
            }
            count++;
          });
        }
        if (group == "Financeiro") {
          this.checkPermissionMaster = false;
          this.checkAllFinanceiro = false;
          let count = 0;
          this.permissionsSelectedFinanceiro.forEach((element: any) => {
            if (element.id == value.id) {
              this.permissionsSelectedFinanceiro.splice(count, 1);
              return;
            }
            count++;
          });
        }
      }
    }
  }

  public selectAllProposta(event) {

    this.checkAllProposta = event.checked;

    this.permissionsSelectedPropostas = [];
    if (event.checked) {
      this.permissionsPropostas.forEach(permissionProposta => {
        let permission: Permission = new Permission();
        permission = permissionProposta;
        permission.permissionId = permissionProposta.id;
        this.permissionsSelectedPropostas.push(permission);
        this.allCheckBoxChecked();
      });
    }else{
      this.checkPermissionMaster = false;
    }
  }

  public isSelectedPermissionPropostas(permission) {

    if (this.permissionsSelectedPropostas) {
      for (var i = 0; i < this.permissionsSelectedPropostas.length; i++) {
        if (this.permissionsSelectedPropostas[i].id == permission.id) {
          return true;
        }
      }
    }
    return false;
  }

  public selectAllAdministrativo(event) {

    this.checkAllAdministrativo = event.checked;

    this.permissionsSelectedAdministrativo = [];
    if (event.checked) {
      this.permissionsAdministrativo.forEach(permissionAdministrativo => {
        let permission: Permission = new Permission();
        permission = permissionAdministrativo;
        permission.permissionId = permissionAdministrativo.id;
        this.permissionsSelectedAdministrativo.push(permission);
        this.allCheckBoxChecked();
      });
    }else{
      this.checkPermissionMaster = false;
    }
  }

  public isSelectedPermissionAdministrativo(permission) {
    if (this.permissionsSelectedAdministrativo) {
      for (var i = 0; i < this.permissionsSelectedAdministrativo.length; i++) {
        if (this.permissionsSelectedAdministrativo[i].id == permission.id) {
          return true;
        }
      }
    }
    return false;
  }

  public selectAllComunicacao(event) {

    this.checkAllComunicacao = event.checked;

    this.permissionsSelectedComunicacao = [];
    if (event.checked) {
      this.permissionsComunicacao.forEach(permissionComunicacao => {
        let permission: Permission = new Permission();
        permission = permissionComunicacao;
        permission.permissionId = permissionComunicacao.id;
        this.permissionsSelectedComunicacao.push(permission);
        this.allCheckBoxChecked();
      });
    }else{
      this.checkPermissionMaster = false;
    }
  }

  public isSelectedPermissionComunicacao(permission) {
    if (this.permissionsSelectedComunicacao) {
      for (var i = 0; i < this.permissionsSelectedComunicacao.length; i++) {
        if (this.permissionsSelectedComunicacao[i].id == permission.id) {
          return true;
        }
      }
    }
    return false;
  }

  public selectAllMarketing(event) {

    this.checkAllMarketing = event.checked;

    this.permissionsSelectedMarketing = [];
    if (event.checked) {
      this.permissionsMarketing.forEach(permissionMarketing => {
        let permission: Permission = new Permission();
        permission = permissionMarketing;
        permission.permissionId = permissionMarketing.id;
        this.permissionsSelectedMarketing.push(permission);
        this.allCheckBoxChecked();
      });
    }else{
      this.checkPermissionMaster = false;
    }
  }

  public isSelectedPermissionMarketing(permission) {
    if (this.permissionsSelectedMarketing) {
      for (var i = 0; i < this.permissionsSelectedMarketing.length; i++) {
        if (this.permissionsSelectedMarketing[i].id == permission.id) {
          return true;
        }
      }
    }
    return false;
  }

  public selectAllFinanceiro(event) {

    this.checkAllFinanceiro = event.checked;

    this.permissionsSelectedFinanceiro = [];
    if (event.checked) {
      this.permissionsFinanceiro.forEach(permissionFinanceiro => {
        let permission: Permission = new Permission();
        permission = permissionFinanceiro;
        permission.permissionId = permissionFinanceiro.id;
        this.permissionsSelectedFinanceiro.push(permission);
        this.allCheckBoxChecked();
      });
    }else{
      this.checkPermissionMaster = false;
    }
  }

  public isSelectedPermissionFinanceiro(permission) {
    if (this.permissionsSelectedFinanceiro) {
      for (var i = 0; i < this.permissionsSelectedFinanceiro.length; i++) {
        if (this.permissionsSelectedFinanceiro[i].id == permission.id) {
          return true;
        }
      }
    }
    return false;
  }

  public selectAllTreinamento(event) {

    this.checkAllTreinamento = event.checked;

    this.permissionsSelectedTreinamento = [];
    if (event.checked) {
      this.permissionsTreinamento.forEach(permissionTreinamento => {
        let permission: Permission = new Permission();
        permission = permissionTreinamento;
        permission.permissionId = permissionTreinamento.id;
        this.permissionsSelectedTreinamento.push(permission);
        this.allCheckBoxChecked();
      });
    }else{
      this.checkPermissionMaster = false;
    }
  }

  public isSelectedPermissionTreinamento(permission) {
    if (this.permissionsSelectedTreinamento) {
      for (var i = 0; i < this.permissionsSelectedTreinamento.length; i++) {
        if (this.permissionsSelectedTreinamento[i].id == permission.id) {
          return true;
        }
      }
    }
    return false;
  }

  private removeEmptyObjectAndAddPermission() {

    this.permissionsSelected = [];
    this.permissionsSelected = this.permissionsSelected.concat(this.permissionsSelectedPropostas);
    this.permissionsSelected = this.permissionsSelected.concat(this.permissionsSelectedAdministrativo);
    this.permissionsSelected = this.permissionsSelected.concat(this.permissionsSelectedComunicacao);
    this.permissionsSelected = this.permissionsSelected.concat(this.permissionsSelectedMarketing);
    this.permissionsSelected = this.permissionsSelected.concat(this.permissionsSelectedFinanceiro);
    this.permissionsSelected = this.permissionsSelected.concat(this.permissionsSelectedTreinamento);

    if (this.permissionsSelected.length > 0) {
      let filtered = this.permissionsSelected.filter(function (el) {
        return el != null;
      });
      this.user.userPermissionsDto = filtered;
    }
  }
}
