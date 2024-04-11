import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from "./FrontOffice/all-template-front/all-template-front.component";
import { AllTemplateBackComponent }from "./BackOffice/all-template-back/all-template-back.component";
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

const routes: Routes = [
  {
  path:"Employee",
  component: AllTemplateFrontComponent,
  children:[

    { path:"home",component:HomeComponent},
    { path:"TimeOffTracker",component:TimeofftrackerComponent},
    { path:"taketimeoff",component:TaketimeoffComponent},
    { path:"expense",component:DepenseComponent},
    { path:"checkreponse/:id",component:CheckreponseComponent},
    { path: "reclamation/:id", component: ReclamationComponent }, 
   


    { path:"reclamation",component:ReclamationComponent}

   
    
    ]
  },
  {
  path:"admin",
  component: AllTemplateBackComponent,
  children:[

    {path:"user",component:UserComponent},  
   
    { path:"TimeOffTracker",component:TimeofftrackerComponent},
    { path:"expense",component:ExpenseComponent},
   

    { path:"TimeOffTracker",component:TimeofftrackerComponent},
    { path:"reclamation",component:AdmrecComponent},
    { path:"reponse",component:ReponseComponent},
    { path: "reponse/:id", component: ReponseComponent }, 
    
    { path:"teams",component:TeamComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
