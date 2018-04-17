import { MongoObservable } from 'meteor-rxjs';
import { Patient } from '../models/patient.model';

export const Patients = new MongoObservable.Collection<Patient>('patients');