import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from "./FrontOffice/all-template-front/all-template-front.component";
import { AllTemplateBackComponent }from "./BackOffice/all-template-back/all-template-back.component";
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { UserComponent } from './components/user/user.component';
import { TimeofftrackerComponent } from './components/timeofftracker/timeofftracker.component';
import { ExpenseComponent } from './components/expense/expense.component';
import { StockComponent } from './components/stock/stock.component';
const routes: Routes = [
  {
  path:"Employee",
  component: AllTemplateFrontComponent,
  children:[
    
    ]


  },
  {
  path:"admin",
  component: AllTemplateBackComponent,
  children:[

    {path:"user",component:UserComponent},  

    { path:"TimeOffTracker",component:TimeofftrackerComponent},
    { path:"expense",component:ExpenseComponent},
    { path:"stock",component:StockComponent}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
