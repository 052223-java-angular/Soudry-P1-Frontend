import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartupComponent } from './screens/startup/startup.component';
import { MainComponent } from './screens/main/main.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GenerateTeamComponent } from './models/generate-team/generate-team.component';
import { FightComponent } from './models/fight/fight.component';

@NgModule({
  declarations: [
    AppComponent,
    StartupComponent,
    MainComponent,
    GenerateTeamComponent,
    FightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
