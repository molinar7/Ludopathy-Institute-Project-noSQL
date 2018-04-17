import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { routes } from './app.routes';
import { LOGIN_DECLARATIONS } from './login';
import { PATIENTS_LIST_DECLARATIONS } from './patients-list';
import { PATIENT_FILE_DECLARATIONS } from './patient-file';
import { PATIENT_CREATION_DECLARATIONS } from './patient-creation';
import { NAVBAR_DECLARATIONS } from './navbar';
import { CHANGE_PASSWORD_DECLARATIONS } from './change-password';
import { PATIENT_SUMMARY_DECLARATIONS } from './patient-summary';

 
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent,
    ...PATIENTS_LIST_DECLARATIONS,
    ...PATIENT_FILE_DECLARATIONS,
    ...PATIENT_CREATION_DECLARATIONS,
    ...LOGIN_DECLARATIONS,
    ...NAVBAR_DECLARATIONS,
    ...CHANGE_PASSWORD_DECLARATIONS,
    ...PATIENT_SUMMARY_DECLARATIONS
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}