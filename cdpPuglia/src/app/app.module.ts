import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { ThreatsComponent } from './threats/threats.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThreatsFiltersComponent } from './threats/threats-filters/threats-filters.component';
import { ThreatsDiagramsComponent } from './threats/threats-diagrams/threats-diagrams.component';
// For MDB Angular Free
import { ChartsModule, WavesModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import { ChangeProfileComponent } from './auth/change-profile/change-profile.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThreatsComponent,
    HeaderComponent,
    SidenavListComponent,
    FooterComponent,
    ThreatsFiltersComponent,
    ThreatsDiagramsComponent,
    ChangeProfileComponent,
    ThreatsDiagramsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass:'toast-bottom-right' }),
    HttpClientModule,
    FontAwesomeModule,
    ChartsModule,
    WavesModule,
    MDBBootstrapModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
