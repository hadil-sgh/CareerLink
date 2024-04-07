import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateFrontComponent } from "./FrontOffice/all-template-front/all-template-front.component";
import { AllTemplateBackComponent } from "./BackOffice/all-template-back/all-template-back.component";
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
<<<<<<< HEAD
import { ModalpopComponent } from './modalpop/modalpop.component';
import { RejectComponent } from './traitmentaccept/reject/reject.component';
import { LeaveStatisticsComponent } from './leave-statistics/leave-statistics.component';

const routes: Routes = [
  {
    path: "Employee",
    component: AllTemplateFrontComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "TimeOffTracker", component: TimeofftrackerComponent },
      { path: "taketimeoff", component: TaketimeoffComponent },
      { path: "TimeOffTracker/update/:id", component: ModalpopComponent },
      { path: "expense", component: DepenseComponent },

    ]
  },
  {
    path: "admin",
    component: AllTemplateBackComponent,
    children: [
      { path: "user", component: UserComponent },
      { path: "TimeOffTracker", component: TakeofftraitmentComponent },
      { path: "expense", component: ExpenseComponent },
      { path: "stock", component: StockComponent },
      { path: "teams", component: TeamComponent },
      { path: "TimeOffTracker/traitment/:id", component: RejectComponent },
      { path: "sata", component: LeaveStatisticsComponent },

=======
import { ProfileComponent } from './components/profile/profile.component';
const routes: Routes = [
  { path:'login',component:LoginComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  { path:'register',component:RegisterComponent},

  { path:"Employee",component: AllTemplateFrontComponent,
  children:[

    { path:"home",component:HomeComponent},
    { path:"TimeOffTracker",component:TimeofftrackerComponent},
    { path:"taketimeoff",component:TaketimeoffComponent},
    { path:"expense",component:DepenseComponent},

    
    ]
  },
  {
  path:"admin",component: AllTemplateBackComponent,
  children:[

    {path:"user",component:UserComponent,  canActivate: [AuthGuard]},  
    { path:"TimeOffTracker",component:TakeofftraitmentComponent},
    { path:"expense",component:ExpenseComponent},
    { path:"stock",component:StockComponent},
    { path:"TimeOffTracker",component:TimeofftrackerComponent},
    { path:"teams",component:TeamComponent},
    { path:"profile/:id",component:ProfileComponent}

  
>>>>>>> 35536b9ad41396233de781ecfab0340132126b63
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
