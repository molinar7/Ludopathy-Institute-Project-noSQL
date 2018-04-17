import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import { Router } from '@angular/router';

import { Patients } from '../../../../../both/collections/patients.collection';
import { Patient } from '../../../../../both/models/patient.model';

import template from './add-patient.component.html';
 
@Component({
  selector: 'add-patient',
  template
})
export class AddPatientComponent implements OnInit {
  addForm: FormGroup;
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido_paterno: ['', Validators.required],
      apellido_materno: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      direccion: ['', Validators.required],
      telefono: ['', Validators.required],
      fecha_de_nacimiento: ['', Validators.required],
      referido_por: ['', Validators.required],
      lugar_de_residencia: ['', Validators.required],
      motivo_consulta: ['', Validators.required]
    });
  }

  cancel():void {
    this.router.navigate(['pacientes']);
  }

  addPatient():void {
    if (this.addForm.invalid) {
      alert("Favor de llenar todos los datos.");
      return;
    }
    
    let patient = {
       datos_personales: this.addForm.value
    }
    MeteorObservable.call('addPatient', patient).subscribe(() => {
      alert('User successfully added.');
      this.router.navigate(['pacientes']);
    }, (error) => {
      alert(`Failed to add due to ${error}`);
    });
  }
}
