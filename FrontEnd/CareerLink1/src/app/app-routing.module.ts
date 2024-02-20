import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AllTemplateFrontComponent} from "./FrontOffice/all-template-front/all-template-front.component";
import {AllTemplateBackComponent}from "./BackOffice/all-template-back/all-template-back.component";
const routes: Routes = [
  {
  path:"",
  component: AllTemplateFrontComponent
  },
  {
  path:"admin",
  component: AllTemplateBackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
