import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupComponent } from './screens/startup/startup.component';
import { MainComponent } from './screens/main/main.component';
import { NotfoundComponent } from './screens/notfound/notfound.component';
import { TutorialComponent } from './screens/tutorial/tutorial.component';
import { LoginComponent } from './screens/login/login.component';
import { RegisterComponent } from './screens/register/register.component';

const routes: Routes = [

  {path: 'main', component:MainComponent},
  {path: 'landing', component:StartupComponent},
  {path: 'login', component:LoginComponent},
  {path: 'register', component:RegisterComponent},
  {path: "", component:TutorialComponent},
  {path: '**', component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
