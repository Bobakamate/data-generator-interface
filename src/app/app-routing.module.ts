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
import { ConditionsComponent } from './conditions/conditions.component';
import { ReferenceComponent } from './reference/reference.component';
import { DynamicValuesComponent } from './dynamic-values/dynamic-values.component';
import { ProjetComponent } from './projet/projet.component';
import { DataDownloadComponent } from './data-download/data-download.component';
import { LoginComponent } from './login/login.component'; // Import du composant de connexion
import { AppComponent } from './app.component'; // Import de AppComponent pour la route principale
import { DynamicContainerComponent } from './dynamic-container/dynamic-container.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route de connexion
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirection vers la page de connexion par défaut
  { 
    path: 'app', 
    component: DynamicContainerComponent, 
    children: [
      { path: 'add-values', component: AddValuesComponent },
      { path: 'rules-box', component: RulesBoxComponent },
      { path: 'rules', component: RulesComponent },
      { path: 'visualisation', component: VisualisationComponent },
      { path: 'rules-views', component: RulesViewComponent },
      { path: 'injection-box', component: InjectionBoxComponent },
      { path: 'injection', component: InjectionComponent },
      { path: 'injection-line', component: InjectionLineComponent },
      { path: 'injection-colunm', component: InjectionColunmComponent },
      { path: 'injection-add-values', component: InjectionColunmValuesComponent },
      { path: 'echantillonnage', component: EchantillonnageComponent },
      { path: 'conditions', component: ConditionsComponent },
      { path: 'generation', component: GenerationComponent },
      { path: 'reference', component: ReferenceComponent },
      { path: 'dynamic-values', component: DynamicValuesComponent },
      { path: 'projets', component: ProjetComponent },
      { path: 'data', component: DataDownloadComponent },
      { path: '', redirectTo: '/app/projets', pathMatch: 'full' }, 
      { path: 'profil', component: ProfileComponent },
      { path: 'data-generation', component: HomeComponent },
 

    ]
  },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
