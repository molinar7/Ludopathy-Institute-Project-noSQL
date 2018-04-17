import { Route } from '@angular/router';

//Leo
import { LoginComponent } from './login/login.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

//Resto
import { PatientsListComponent } from './patients-list/patients-list.component';
import { PatientFileComponent } from './patient-file/patient-file.component';
import { AddPatientComponent } from './patient-creation/add-patient/add-patient.component';
import { AddDemographicComponent } from './patient-creation/add-demographic/add-demographic.component';
import { AddExamenMentalComponent } from './patient-creation/add-examen-mental/add-examen-mental.component';
import { AddActualDataComponent } from './patient-creation/add-actual-data/add-actual-data.component';
import { AddPathologicalBackgroundComponent } from './patient-creation/add-pathological-background/add-pathological-background.component';
import { AddSustanceAbuseHistoryComponent } from './patient-creation/add-sustance-abuse-history/add-sustance-abuse-history.component';
import { AddGynecologicalObstetricsBackgroundComponent } from './patient-creation/add-gynecological-obstetrics-background/add-gynecological-obstetrics-background.component';
import { PatientSummaryComponent } from './patient-summary/patient-summary.component';
import { AddHistoryComponent } from './patient-creation/add-history/add-history.component';
import { AddDiagnosticoTratamientoComponent } from './patient-creation/add-diagnostico-tratamiento/add-diagnostico-tratamiento.component';

export const routes: Route[] = [
  { path: '', component: LoginComponent },
  { path: 'pacientes', component: PatientsListComponent },
  { path: 'paciente/:id', component: PatientFileComponent },
  { path: 'agregar-paciente', component: AddPatientComponent},
  { path: 'datos-demograficos/:id', component: AddDemographicComponent},
  { path: 'datos-episodio-actual/:id', component: AddActualDataComponent},
  { path: 'cambiar-contrasena', component: ChangePasswordComponent},
  { path: 'datos-antecedentes-patologicos/:id', component: AddPathologicalBackgroundComponent},
  { path: 'datos-abuso-sustancias/:id', component: AddSustanceAbuseHistoryComponent},
  { path: 'datos-gineco-obstetricos/:id', component: AddGynecologicalObstetricsBackgroundComponent},
  { path: 'resumen/:id', component: PatientSummaryComponent}, 
  { path: 'datos-historia/:id', component: AddHistoryComponent}, 
  { path: 'datos-examen-mental/:id', component: AddExamenMentalComponent},
  { path: 'datos-diagnostico-tratamiento/:id', component: AddDiagnosticoTratamientoComponent}
];