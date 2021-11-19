import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ChangeProfileComponent } from './auth/change-profile/change-profile.component';
import { ThreatsComponent } from './threats/threats.component';
import { NotFoundComponent } from './_errors/not-found/not-found.component';
import { ServerErrorComponent } from './_errors/server-error/server-error.component';
import { TestErrorsComponent } from './_errors/test-errors/test-errors.component';
import { AuthGuard } from './_guards/auth.guard';
import { ThreatContentComponent } from './threats/threat-content/threat-content.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Navigation1Component } from './navigation1/navigation1.component';


const routes: Routes = [
  //{ path:'translations', component: MultiLanguageComponent },
  //{ path:'', component: ThreatsComponent, canActivate: [AuthGuard] },
  { path:'', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent },
  { path:'threats', component: ThreatsComponent, canActivate: [AuthGuard] },
  { path:'threat-content', component: ThreatContentComponent, canActivate: [AuthGuard] },
  { path:'login', component: LoginComponent },
  { path:'changeprofile', component: ChangeProfileComponent },
  { path:'errors',component:TestErrorsComponent},
  { path:'not-found',component:NotFoundComponent},
  { path:'server-error',component:ServerErrorComponent},
  { path:'**',component:ThreatsComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
