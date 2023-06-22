import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StartupComponent } from './screens/startup/startup.component';
import { MainComponent } from './screens/main/main.component';

import { HttpClient, HttpClientModule } from '@angular/common/http';
import { GenerateTeamComponent } from './models/generate-team/generate-team.component';
import { FightComponent } from './models/fight/fight.component';
import { TutorialComponent } from './screens/tutorial/tutorial.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';
import { NotfoundComponent } from './screens/notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    StartupComponent,
    MainComponent,
    GenerateTeamComponent,
    FightComponent,
    TutorialComponent,
    LoginComponent,
    RegisterComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent]
})
export class AppModule { }
