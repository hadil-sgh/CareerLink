import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { AppComponent } from './app.component';
import { AllTemplateFrontComponent } from './FrontOffice/all-template-front/all-template-front.component';
import { AllTemplateBackComponent } from './BackOffice/all-template-back/all-template-back.component';
import { FooterBackComponent } from './BackOffice/footer-back/footer-back.component';
import { NavbarBackComponent } from './BackOffice/navbar-back/navbar-back.component';
import { SidebarBackComponent } from './BackOffice/sidebar-back/sidebar-back.component';
import { FooterFrontComponent } from './FrontOffice/footer-front/footer-front.component';
import { HeaderFrontComponent } from './FrontOffice/header-front/header-front.component';
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { UserComponent } from './components/user/user.component';
import { TimeofftrackerComponent } from './components/timeofftracker/timeofftracker.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { StockComponent } from './components/stock/stock.component';
import { DepenseComponent } from './components/depense/depense.component';
import { TeamComponent } from './components/team/team.component';
import { TaketimeoffComponent } from './components/taketimeoff/taketimeoff.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AuthGuard } from './models/AuthGuard';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { TakeofftraitmentComponent } from './takeofftraitment/takeofftraitment.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import{NgxExtendedPdfViewerModule}from'ngx-extended-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    AllTemplateFrontComponent,
    AllTemplateBackComponent,
    FooterBackComponent,
    NavbarBackComponent,
    SidebarBackComponent,
    FooterFrontComponent,
    HomeBackComponent,
    HeaderFrontComponent,
    UserComponent,
    TimeofftrackerComponent,
    ExpenseComponent,
    StockComponent,
    DepenseComponent,
    TeamComponent,
    TaketimeoffComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    TakeofftraitmentComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxExtendedPdfViewerModule,
    NgbModule,

  ],
  providers: [ 
   
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
