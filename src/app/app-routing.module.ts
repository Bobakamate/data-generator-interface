import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddValuesComponent } from './add-values/add-values.component';
import { RulesBoxComponent } from './rules-box/rules-box.component';
import { RulesComponent } from './rules/rules.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { GenerationComponent } from './generation/generation.component';

const routes: Routes = [

  {path : "",component : HomeComponent},
  {path:"add-values", component:AddValuesComponent},
  {path:"rules-box", component:RulesBoxComponent},
  {path:"rules", component:RulesComponent},
  {path:"visualisation", component:VisualisationComponent},
  {path:"generation", component:GenerationComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
