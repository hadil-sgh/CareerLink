import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllTemplateFrontComponent} from "./FrontOffice/all-template-front/all-template-front.component";
import {AllTemplateBackComponent}from "./BackOffice/all-template-back/all-template-back.component";
import { HomeBackComponent } from './BackOffice/home-back/home-back.component';
import { TimeofftrackerComponent } from './components/timeofftracker/timeofftracker.component';
const routes: Routes = [
  {
  path:"Employee",
  component: AllTemplateFrontComponent,
  children:[
    {
    path:"TakeTimeOff",
    component:HomeBackComponent
    }
    ]
  },
  {
  path:"admin",
  component: AllTemplateBackComponent,
  children:[
    {
    path:"home",
    component:HomeBackComponent
    },
    {
      path:"TimeOffTracker",
      component:TimeofftrackerComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
