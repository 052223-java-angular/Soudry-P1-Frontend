import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartupComponent } from './screens/startup/startup.component';
import { MainComponent } from './screens/main/main.component';

const routes: Routes = [

  {path: 'main', component:MainComponent},
  // {path: 'landing', component:StartupComponent}
  {path: '**', component:StartupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
