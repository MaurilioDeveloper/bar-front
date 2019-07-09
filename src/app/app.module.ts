import { CustomHttpInterceptor } from './service/custom-http-interceptor.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorStateMatcher, MatButtonModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule, MatDialogModule, MatExpansionModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatNativeDateModule, MatRadioModule, MatSelectModule, MatTableModule, MatToolbarModule, ShowOnDirtyErrorStateMatcher, MatHorizontalStepper, MatStepperModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StorageServiceModule } from 'angular-webstorage-service';
import { CpfCnpjModule } from 'ng2-cpf-cnpj';
import { ToastrModule } from 'ngx-toastr';
import { VgBufferingModule } from 'videogular2/buffering';
import { VgControlsModule } from 'videogular2/controls';
import { VgCoreModule } from 'videogular2/core';
import { VgOverlayPlayModule } from 'videogular2/overlay-play';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlterPasswordComponent } from './component/alter-password/alter-password.component';
import { CompanyComponent } from './component/company/company.component';
import { CreateCompanyComponent } from './component/company/create-company/create-company.component';
import { ListCompanyComponent } from './component/company/list-company/list-company.component';
import { FinanceiroComponent } from './component/financeiro/financeiro.component';
import { ListagemFinanceiroComponent } from './component/financeiro/listagem/listagem-financeiro.component';
import { BoxHomeComponent } from './component/home/box-home/box-home.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ResetPasswordComponent } from './component/login/reset-password/reset-password.component';
import { CreateUserComponent } from './component/user/create-user/create-user.component';
import { UserComponent } from './component/user/user.component';
import { BariguiMaskDirective } from './directive/barigui-mask-directive';
import { CpfCnpjMaskDirective } from './directive/cpfcnpj.directive';
import { FooterComponent } from './layout/footer/footer.component';
import { HeaderComponent } from './layout/header/header.component';
import { JwtInterceptor } from './service/auth/jwt-interceptor';
import { YesOrNoDialogComponent } from './shared/dialog/yes-or-no-dialog/yes-or-no-dialog.component';
import { HeaderCrudComponent } from './shared/header-crud/header-crud.component';
import { ConfirmFirstAccessComponent } from './component/confirm-first-access/confirm-first-access.component';


@NgModule({
  declarations: [
    AppComponent,
    CpfCnpjMaskDirective,
    BariguiMaskDirective,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
    BoxHomeComponent,
    FinanceiroComponent,
    ListagemFinanceiroComponent,
    CompanyComponent,
    HeaderCrudComponent,
    ListCompanyComponent,
    CreateCompanyComponent,
    UserComponent,
    CreateUserComponent,
    YesOrNoDialogComponent,
    FooterComponent,
    ResetPasswordComponent,
    AlterPasswordComponent,
    ConfirmFirstAccessComponent
  ],
  entryComponents: [YesOrNoDialogComponent, ResetPasswordComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    FlexLayoutModule,
    StorageServiceModule,
    MatExpansionModule,
    MatRadioModule,
    MatToolbarModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatChipsModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatStepperModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    CpfCnpjModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [BariguiMaskDirective, CpfCnpjMaskDirective]
})
export class AppModule { }
