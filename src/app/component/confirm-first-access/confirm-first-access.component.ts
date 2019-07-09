import { MaskPhone } from './../../util/mask-phone';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { Navigate } from 'src/app/util/navigate';
import { Company } from './../../model/company';
import { AuthenticationService } from './../../service/auth/authentication.service';
import { CompanyService } from './../../service/company.service';
import { MessageToastService } from './../../service/message-toast.service';
import { UserService } from './../../service/user.service';
import { CpfCnpjValidator } from './../../util/cpf-cnpj-validator';

@Component({
  selector: 'app-confirm-first-access',
  templateUrl: './confirm-first-access.component.html',
  styleUrls: ['./confirm-first-access.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: { showError: true }
  }]
})
export class ConfirmFirstAccessComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  //Mascaras
  public maskPhone = '(99)999999999';
  public controlMask: boolean = false;

  //Formularios
  @ViewChild('form') public form: NgForm;

  //Instancias
  public company: Company = new Company();
  public user: User = new User();


  //FormControl
  public descriptionControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public cepControl = new FormControl('', [Validators.required]);
  public stateControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public cityControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public observationControl = new FormControl('', [Validators.maxLength(255)]);
  public emailPartnerControl = new FormControl('', [Validators.required, Validators.email]);
  public userLeaderControl = new FormControl('', [Validators.required]);
  public userPartnerControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public phonePartnerControl = new FormControl('', [Validators.required, Validators.minLength(10)]);
  public statePartnerControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public cityPartnerControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public cepPartnerControl = new FormControl('', [Validators.required, Validators.minLength(8)]);

  public cnpj: AbstractControl;

  //Validações
  public userForm: FormGroup = new FormGroup({
    cpf: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      CpfCnpjValidator.valida_cpf,
    ])
  });
  public companyForm: FormGroup = new FormGroup({
    cnpj: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      CpfCnpjValidator.valida_cnpj,
    ])
  });

  constructor(private companyService: CompanyService,
    public authenticationService: AuthenticationService,
    private router: Router,
    private toastService: MessageToastService) { }

  ngOnInit() {
    this.findCompany();
  }

  private findCompany() {
    let companyId = this.authenticationService.currentUserValue.companyId;
    this.companyService.getCompanyById(companyId).subscribe(
      result => {
        
        this.company = result;
        this.user = this.authenticationService.currentUserValue;
      },
      error => {
        
      }
    )
  }

  public verifyChangeStep() {
    // return this.companyForm.get('cnpj') && this.cepControl && this.descriptionControl &&
    // this.stateControl && this.cityControl;
  }

  /**
   * Metodo que verifica para desabilitar botão
   * de mudar de aba
   */
  public verifyDisableChangeStep() {
    if (this.companyForm.get('cnpj').invalid ||
      !this.form.form.valid ||
      !this.descriptionControl.valid ||
      !this.cityControl.valid ||
      !this.stateControl.valid ||
      !this.cepControl.valid ||
      !this.observationControl.valid) {
      return true;
    }
    return false;
  }

  public verifyDisableFinish() {
    if (this.userForm.get('cpf').invalid ||
      !this.emailPartnerControl.valid ||
      !this.phonePartnerControl.valid ||
      !this.cityPartnerControl.valid ||
      !this.statePartnerControl.valid ||
      !this.cepPartnerControl.valid ||
      !this.userPartnerControl.valid) {
      return true;
    }
    return false;
  }

  public changeMaskPhone(valor) {
    MaskPhone.applyMask(valor);
  }

  public updateInformations() {
    this.company.usersDto = [];
    this.company.usersDto.push(this.user);
    console.log(this.company);
    this.companyService.updateCompanyBasic(this.company).subscribe(
      result => {
        this.toastService.showMsgSuccess('Dados atualizados com sucesso');
        this.user.firstAccessCompany = true;
        this.authenticationService.currentUserSubject.next(this.user);
        return Navigate.redirect('/home', this.router);
      },
      error => {
        this.toastService.showMsgError(error.error);
      }
    )
  }
}
