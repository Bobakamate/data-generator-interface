import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Import the HttpClientModule

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AddValuesComponent } from './add-values/add-values.component';
import { RulesBoxComponent } from './rules-box/rules-box.component';
import { RulesComponent } from './rules/rules.component';
import { VisualisationComponent } from './visualisation/visualisation.component';
import { GenerationComponent } from './generation/generation.component';
import { RulesViewComponent } from './rules-view/rules-view.component';
import { InjectionBoxComponent } from './injection-box/injection-box.component';
import { InjectionComponent } from './injection/injection.component';
import { InjectionColunmComponent } from './injection-colunm/injection-colunm.component';
import { InjectionLineComponent } from './injection-line/injection-line.component';
import { InjectionColunmValuesComponent } from './injection-colunm-values/injection-colunm-values.component';
import { EchantillonnageComponent } from './echantillonnage/echantillonnage.component';
import { ConditionsComponent } from './conditions/conditions.component';
import { ReferenceComponent } from './reference/reference.component';
import { DynamicValuesComponent } from './dynamic-values/dynamic-values.component';
import { ProjetComponent } from './projet/projet.component';
import { DataDownloadComponent } from './data-download/data-download.component';
import { LoginComponent } from './login/login.component';
import { DynamicContainerComponent } from './dynamic-container/dynamic-container.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddValuesComponent,
    RulesBoxComponent,
    RulesComponent,
    VisualisationComponent,
    GenerationComponent,
    RulesViewComponent,
    InjectionBoxComponent,
    InjectionComponent,
    InjectionColunmComponent,
    InjectionLineComponent,
    InjectionColunmValuesComponent,
    EchantillonnageComponent,
    ConditionsComponent,
    ReferenceComponent,
    DynamicValuesComponent,
    ProjetComponent,
    DataDownloadComponent,
    LoginComponent,
    DynamicContainerComponent,
    ProfileComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule  // Add HttpClientModule here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
