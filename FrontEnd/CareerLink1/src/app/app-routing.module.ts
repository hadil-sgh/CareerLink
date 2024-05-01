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
import { ProfileComponent } from './components/profile/profile.component';
import { ModalpopComponent } from './modalpop/modalpop.component';
import { RejectComponent } from './traitmentaccept/reject/reject.component';
import { LeaveStatisticsComponent } from './leave-statistics/leave-statistics.component';
import { PoliciesComponent } from './policies/policies.component';
import { BlackoutComponent } from './blackout/blackout.component';
import { PerformenceComponent } from './components/performence/performence.component';
import { PerformencedisplayComponent } from './components/performencedisplay/performencedisplay.component';
import { PerformenceemployeeComponent } from './components/performenceemployee/performenceemployee.component';
import { ProjectComponent } from './components/project/project.component';

const routes: Routes = [
  { path:'login',component:LoginComponent},
  {path:'',redirectTo:'/login',pathMatch:'full'},
  { path:'register',component:RegisterComponent},
  {
    path: "Employee",
    component: AllTemplateFrontComponent,
    children: [
      { path: "home", component: HomeComponent },
      { path: "TimeOffTracker", component: TimeofftrackerComponent },
      { path: "taketimeoff", component: TaketimeoffComponent },
      { path: "TimeOffTracker/update/:id", component: ModalpopComponent },
      { path: "expense", component: DepenseComponent },
      { path:"performenceempl",component:PerformenceemployeeComponent},

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
      { path: "policies", component: PoliciesComponent },
      { path: "blackout", component: BlackoutComponent },
      { path: "teams", component: TeamComponent },
      { path: "TimeOffTracker/traitment/:id", component: RejectComponent },
      { path: "sata", component: LeaveStatisticsComponent },
      { path:"profile/:id",component:ProfileComponent},
      { path:"performence",component:PerformencedisplayComponent},
      { path:"performenceadd",component:PerformenceComponent},
      { path:"project",component:ProjectComponent},


]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
