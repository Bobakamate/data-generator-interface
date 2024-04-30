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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AddValuesComponent,
    RulesBoxComponent,
    RulesComponent,
    VisualisationComponent,
    GenerationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
