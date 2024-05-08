import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddValuesComponent } from './add-values/add-values.component';
import { RulesBoxComponent } from './rules-box/rules-box.component';
import { RulesComponent } from './rules/rules.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { GenerationComponent } from './generation/generation.component';
import { RulesViewComponent } from './rules-view/rules-view.component';
import { InjectionBoxComponent } from './injection-box/injection-box.component';
import { InjectionComponent } from './injection/injection.component';
import { InjectionLineComponent } from './injection-line/injection-line.component';
import { InjectionColunmComponent } from './injection-colunm/injection-colunm.component';
import { InjectionColunmValuesComponent } from './injection-colunm-values/injection-colunm-values.component';
import { EchantillonnageComponent } from './echantillonnage/echantillonnage.component';

const routes: Routes = [

  {path : "",component : HomeComponent},
  {path:"add-values", component:AddValuesComponent},
  {path:"rules-box", component:RulesBoxComponent},
  {path:"rules", component:RulesComponent},
  {path:"visualisation", component:VisualisationComponent},
  {path:"rules-views", component:RulesViewComponent},
  {path:"injection-box", component:InjectionBoxComponent},
  {path:"injection", component:InjectionComponent},
  {path:"injection-line", component:InjectionLineComponent},
  {path:"injection-colunm", component:InjectionColunmComponent},
  {path:"injection-add-values", component:InjectionColunmValuesComponent},
  {path:"echantillonnage", component:EchantillonnageComponent},


  



  

  {path:"generation", component:GenerationComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
