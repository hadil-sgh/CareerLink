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
import { TakeofftraitmentComponent } from './takeofftraitment/takeofftraitment.component';
import { ErrorInterceptor } from './services/error.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import {NgxExtendedPdfViewerModule}from'ngx-extended-pdf-viewer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalpopComponent } from './modalpop/modalpop.component';
import { MatDialogModule } from '@angular/material/dialog';
import { RejectComponent } from './traitmentaccept/reject/reject.component';
import { LeaveStatisticsComponent } from './leave-statistics/leave-statistics.component';
import { JwtModule } from "@auth0/angular-jwt";
import { RecruitmentComponent } from './components/recruitment/recruitment.component';
import { PoliciesComponent } from './policies/policies.component';
import { BlackoutComponent } from './blackout/blackout.component';
import { PerformenceComponent } from './components/performence/performence.component';
import { PerformencedisplayComponent } from './components/performencedisplay/performencedisplay.component';
import { PerformenceemployeeComponent } from './components/performenceemployee/performenceemployee.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SearchPipePipe } from './search-pipe.pipe';

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
    ModalpopComponent,
    RejectComponent,
    LeaveStatisticsComponent,
    RecruitmentComponent,
    PoliciesComponent,
    BlackoutComponent,
    PerformenceComponent,
    PerformencedisplayComponent,
    PerformenceemployeeComponent,
    DashboardComponent,
    SearchPipePipe,
    
  ],
  imports: [
    BrowserModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem("token");
        },
        allowedDomains: ["localhost:8086"], 
        disallowedRoutes: [],
      },
    }),   
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxExtendedPdfViewerModule,
    NgbModule,
    MatDialogModule

     
    
,

   
  ],
  providers: [ 
   
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
export function tokenGetter() {
  return localStorage.getItem("access_token");
}