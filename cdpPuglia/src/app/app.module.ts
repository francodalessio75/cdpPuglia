import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { ThreatsComponent } from './threats/threats.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { ThreatsFiltersComponent } from './threats/threats-filters/threats-filters.component';
import { ThreatsDiagramsComponent } from './threats/threats-diagrams/threats-diagrams.component';
// For MDB Angular Free
import { ChartsModule, WavesModule, MDBBootstrapModule } from 'angular-bootstrap-md';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThreatsComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    FooterComponent,
    ThreatsFiltersComponent,
    ThreatsDiagramsComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    FormsModule,
    ChartsModule,
    WavesModule,
    MDBBootstrapModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
