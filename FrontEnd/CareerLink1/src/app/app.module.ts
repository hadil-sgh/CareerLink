import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
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
import { TeamComponent } from './components/team/team.component';
import { TaketimeoffComponent } from './components/taketimeoff/taketimeoff.component';
import { HomeComponent } from './components/home/home.component';
import { DepenseComponent } from './components/depense/depense.component';
import { ReclamationComponent } from './components/reclamation/reclamation.component';
import { AdmrecComponent } from './components/admrec/admrec.component';
import { ReponseComponent } from './components/reponse/reponse.component';
import { CheckreponseComponent } from './components/checkreponse/checkreponse.component';
import { StripeComponent } from './components/stripe/stripe.component';
import { DatePipe } from '@angular/common';
import { AnswredComponent } from './components/answred/answred.component';




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
    TeamComponent,
    TaketimeoffComponent,
    HomeComponent,
    DepenseComponent,
    ReclamationComponent,
    AdmrecComponent,
    ReponseComponent,
    CheckreponseComponent,
    StripeComponent,
    AnswredComponent,
    
   

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //access to functionalities for sending and handling HTTP requests
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
  ],
  providers: [
    DatePipe // Assurez-vous d'ajouter DatePipe aux fournisseurs ici
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
