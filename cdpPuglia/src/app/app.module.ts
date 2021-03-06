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
import { FooterComponent } from './navigation/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ThreatsFiltersComponent } from './threats/threats-filters/threats-filters.component';
import { ThreatsDiagramsComponent } from './threats/threats-diagrams/threats-diagrams.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
// For MDB Angular Free
import { WavesModule, MDBBootstrapModule } from 'angular-bootstrap-md';
import {ChartsModule} from 'ng2-charts';
import { CookieService } from 'ngx-cookie-service';

import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { MultiLanguageComponent } from './multi-language/multi-language.component';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';
import { ChangeProfileComponent } from './auth/change-profile/change-profile.component';
import { ThreatsSearchParametersComponent } from './threats/threats-search-parameters/threats-search-parameters.component';
import { ThreatsTableComponent } from './threats/threats-table/threats-table.component';
import { ThreatContentComponent } from './threats/threat-content/threat-content.component';
import {MatDialogModule,MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { ThreatDataComponent } from './threats/threat-content/threat-data/threat-data.component';
import { ExternalLinksComponent } from './threats/threat-content/external-links/external-links.component';
import { ThreatMapComponent } from './threats/threat-content/threat-map/threat-map.component';
import { IntelligenceDataComponent } from './threats/threat-content/intelligence-data/intelligence-data.component';
import { ThreatConnectionsComponent } from './threats/threat-content/threat-connections/threat-connections.component';
import { SystemControlComponent } from './administration/system-control/system-control.component';
import { FeelerStatusComponent } from './administration/system-control/feeler-status/feeler-status.component';
import { SystemRestartComponent } from './administration/system-control/system-restart/system-restart.component';
import { NtpConfigurationComponent } from './administration/system-control/ntp-configuration/ntp-configuration.component';
import { ConfirmationAlertComponent } from './administration/system-control/confirmation-alert/confirmation-alert.component';
import { SuccessFeedbackComponent } from './administration/system-control/success-feedback/success-feedback.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './card/card.component';
import { MatChipsModule } from '@angular/material/chips';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavComponent } from './navigation/sidenav/sidenav.component';
import { RuleDetailsComponent } from './threats/rule-details/rule-details.component';
import { RuleDataComponent } from './threats/rule-details/rule-data/rule-data.component';

import { ManualtimeSettingComponent } from './administration/system-control/manualtime-setting/manualtime-setting.component';
import { CveDataComponent } from './shared-components/cve-data/cve-data.component';
import { CveDetailsComponent } from './shared-components/cve-data/cve-details/cve-details.component';
import { MitreElementsComponent } from './shared-components/mitre-elements/mitre-elements.component';
import { TechniqueDetailsComponent } from './shared-components/mitre-elements/technique-details/technique-details.component';
import { TecnicalDetailsComponent } from './threats/rule-details/tecnical-details/tecnical-details.component';
import { UsersAdministrationComponent } from './administration/users-administration/users-administration.component';
import { UsersTableComponent } from './administration/users-administration/users-table/users-table.component';
import { UserDetailsComponent } from './administration/users-administration/user-details/user-details.component';









@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThreatsComponent,
    FooterComponent,
    ThreatsFiltersComponent,
    ThreatsDiagramsComponent,
    ChangePasswordComponent,
    ChangeProfileComponent,
    ThreatsDiagramsComponent,
    MultiLanguageComponent,
    ThreatsSearchParametersComponent,
    ThreatsTableComponent,
    ThreatContentComponent,
    ThreatDataComponent,
    MitreElementsComponent,
    CveDataComponent,
    ExternalLinksComponent,
    ThreatMapComponent,
    IntelligenceDataComponent,
    TechniqueDetailsComponent,
    CveDetailsComponent,
    ThreatConnectionsComponent,
    SystemControlComponent,
    FeelerStatusComponent,
    SystemRestartComponent,
    NtpConfigurationComponent,
    ConfirmationAlertComponent,
    SuccessFeedbackComponent,
    DashboardComponent,
    CardComponent,
    HeaderComponent,
    SidenavComponent,
    RuleDetailsComponent,
    RuleDataComponent,
    TecnicalDetailsComponent,
    ManualtimeSettingComponent,
    UsersAdministrationComponent,
    UsersTableComponent,
    UserDetailsComponent
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
    MDBBootstrapModule,
    MatDialogModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}},
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
