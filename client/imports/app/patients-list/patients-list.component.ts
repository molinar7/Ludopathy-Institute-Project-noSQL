import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { Patients } from '../../../../both/collections/patients.collection';
import { Patient } from '../../../../both/models/patient.model';

import template from "./patients-list.component.html";


 
@Component({
  selector: 'patients-list',
  template
})

export class PatientsListComponent implements OnInit, OnDestroy{
  patients: Observable<Patient[]>;

  constructor(private router: Router) {
    this.patients = Patients.find({}).zone();
  }

  clickPatient(patientId: String){
    this.router.navigate(['/paciente', patientId]);
  }

  ngOnInit(){
    console.log(Meteor.userId());
  }

  ngOnDestroy(){
  }
}