import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
    EchantillonnageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
