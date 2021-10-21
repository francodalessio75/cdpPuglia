import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ThreatsComponent } from './threats/threats.component';
import { AuthGuard } from './_guards/auth.guard';

const routes: Routes = [
  { path:'', component: ThreatsComponent, canActivate: [AuthGuard] },
  { path:'login', component: LoginComponent },
  {path:'**',component:ThreatsComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
