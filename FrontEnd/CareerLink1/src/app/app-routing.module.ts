import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from "./FrontOffice/all-template-front/all-template-front.component";
import { AllTemplateBackComponent }from "./BackOffice/all-template-back/all-template-back.component";
import { UserComponent } from './components/user/user.component';
import { TimeofftrackerComponent } from './components/timeofftracker/timeofftracker.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { StockComponent } from './components/stock/stock.component';
import { DepenseComponent } from './components/depense/depense.component';
import { TeamComponent } from './components/team/team.component';
import { TaketimeoffComponent } from './components/taketimeoff/taketimeoff.component';
import { HomeComponent } from './components/home/home.component';
const routes: Routes = [
  {
  path:"Employee",
  component: AllTemplateFrontComponent,
  children:[

    { path:"home",component:HomeComponent},
    { path:"TimeOffTracker",component:TimeofftrackerComponent},
    { path:"taketimeoff",component:TaketimeoffComponent},
    { path:"expense",component:DepenseComponent},
    
    ]
  },
  {
  path:"admin",
  component: AllTemplateBackComponent,
  children:[

    {path:"user",component:UserComponent},  

    { path:"TimeOffTracker",component:TimeofftrackerComponent},
    { path:"expense",component:ExpenseComponent},
    { path:"stock",component:StockComponent},

    { path:"TimeOffTracker",component:TimeofftrackerComponent},
    { path:"teams",component:TeamComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
