import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { MessageToastService } from 'src/app/service/message-toast.service';
import { Company } from './../../../model/company';
import { CompanyService } from './../../../service/company.service';
import { CpfCnpjValidator } from './../../../util/cpf-cnpj-validator';

@Component({
  selector: 'app-create-company',
  templateUrl: './create-company.component.html',
  styleUrls: ['./create-company.component.scss']
})
export class CreateCompanyComponent implements OnInit {

  //Formularios
  @ViewChild('form') public form: NgForm;

  //FormControl
  public emailControl = new FormControl('', [Validators.required, Validators.email, Validators.maxLength(255)]);
  public descriptionControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public nameControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public observationControl = new FormControl('', [Validators.maxLength(255)]);
  public stateControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);
  public cityControl = new FormControl('', [Validators.required, Validators.maxLength(255)]);

  // Parceiro
  public company: Company = new Company();
  public cnpj: AbstractControl;
  public companyForm: FormGroup = new FormGroup({
    cnpj: new FormControl('', [
      Validators.required,
      Validators.minLength(14),
      CpfCnpjValidator.valida_cnpj,
    ])
  });
  constructor(private companyService: CompanyService,
              private toastService: MessageToastService) { }

  ngOnInit() {
    this.loadNewUsers();
  }

  saveCompany() {

    let headerModal = '';
    let msgConfirm = 'Deseja cadastrar este parceiro?';

    this.companyService.openYesOrNoDialog(msgConfirm, headerModal,
      () => {
        let company = this.company;
        let cnpjSemMascara = this.company.cnpj.replace(/\D/g, '');
        this.companyService.getCompany(cnpjSemMascara).subscribe(result =>{
          if(result){
            this.companyService.updateCompany(company).subscribe(
              result => {
                
                this.toastService.showMsgSuccess(result);
                setTimeout(() => {
                  window.location.reload();
                }, 2000);
              },
              error => {
                this.toastService.showMsgError(error.error);
              }
            )
          }else{
          this.companyService.saveCompany(company).subscribe(
            result => {
              
              this.toastService.showMsgSuccess(result);
              setTimeout(() => {
                window.location.reload();
              }, 2000);
            },
            error => {
              this.toastService.showMsgError(error.error);
            }
          )
        }
        },error => {
          this.toastService.showMsgError(error.error);
        });
      });
  }

  /**
   * Busca CNPJ no banco para ver se o parceiro já está cadastrado.
   * Caso não esteja, irá buscar na Receita.
   */
  buscaCompanyByCnpj() {
    if (this.companyForm.get('cnpj').valid) {
      let cnpjSemMascara = this.company.cnpj.replace(/\D/g, '');
      this.companyService.getCompany(cnpjSemMascara).subscribe(
        result => {
          
          if (result) {
            this.company = result;
            if (this.company.usersDto.length == 0) {
              this.loadNewUsers();  
            }
          } else {
            this.loadNewUsers();
            if (this.company.id) {
              delete this.company.id;
            }
            //Buscar na Receita
            this.companyService.getCompanyInReceita(cnpjSemMascara).subscribe(
              result => {
                //Dados da Receita
                
                this.company.city = result.municipio;
                this.company.cep = result.cep.replace(/\D/g, '');
                this.company.state = result.uf;
                this.company.description = result.nome;
              },
              error => {
                
                this.toastService.showMsgError(error.error);
              }
            )
          }
        },
        error => {
          
          this.toastService.showMsgError(error.error);
        }
      );
    }
  }

  /**
   * Metodo que verifica para desabilitar botão
   * de salvar
   */
  public verifyDisableSave() {
    if(this.companyForm.get('cnpj').invalid ||
      !this.form.form.valid ||
      !this.emailControl.valid ||
      !this.descriptionControl.valid ||
      !this.nameControl.valid ||
      !this.cityControl.valid ||
      !this.stateControl.valid ||
      !this.observationControl.valid) {
        return true;
      }
    return false;
  }

  loadNewUsers() {
    this.company.usersDto = [{
      name: '',
      email: '',
      observation: ''
    }];    
  }
}
