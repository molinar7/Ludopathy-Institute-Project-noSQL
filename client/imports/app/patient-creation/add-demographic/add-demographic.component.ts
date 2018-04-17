import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../../both/collections/patients.collection';
import { Patient } from '../../../../../both/models/patient.model';

import template from './add-demographic.component.html';
 
@Component({
  selector: 'add-demographic',
  template
})
export class AddDemographicComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  id: string;
  paramsSub: Subscription;
  patient: Patient
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.id = id;
        this.patient = Patients.findOne(this.id);
      });

    let datos = this.patient.datos_demograficos;

    this.addForm = this.formBuilder.group({
      estado_civil: [datos ? datos.estado_civil : '' , [Validators.required]],
      religion: [datos ? datos.religion : '' , [Validators.required]],
      escolaridad: [datos ? datos.escolaridad : '' , [Validators.required]],
      sustento_familiar: [datos ? datos.sustento_familiar : '' , [Validators.required]],
      ocupacion_jefe_familia: [datos ? datos.ocupacion_jefe_familia : '' , [Validators.required]],
      ocupacion_paciente: [datos ? datos.ocupacion_paciente : '' , [Validators.required]]
    });
  }

  addDemographic():void {
    console.log(this.addForm.value)
    if (this.addForm.invalid) {
      alert("Favor de llenar todos los datos.");
      return;
    }

    MeteorObservable.call('addDemographic', this.addForm.value, this.id).subscribe(() => {
      this.router.navigate(['/paciente', this.id]);
    }, (error) => {
      alert(`Failed to add due to ${error}`);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
