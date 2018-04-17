import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../../both/collections/patients.collection';
import { Patient } from '../../../../../both/models/patient.model';

import template from './add-diagnostico-tratamiento.component.html';
 
@Component({
  selector: 'add-diagnostico-tratamiento',
  template
})
export class AddDiagnosticoTratamientoComponent implements OnInit, OnDestroy {
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

    let datos = this.patient.datos_diagnostico_tratamiento;

    this.addForm = this.formBuilder.group({
      primario: [datos ? datos.primario : '' , [Validators.required]],
      secundario: [datos ? datos.secundario : '' , [Validators.required]],
      seguimiento_farmacologico: [datos ? datos.seguimiento_farmacologico: '' , [Validators.required]],
      modalidad_terapeutica: [datos ? datos.modalidad_terapeutica : '' , [Validators.required]],
      pronostico: [datos ? datos.pronostico : '' , [Validators.required]],
      evaluador_nombre: [datos ? datos.evaluador_nombre : '' , [Validators.required]],
      evaluador_categoria: [datos ? datos.evaluador_categoria : '' , [Validators.required]],
      //cronologia: [datos ? datos.cronologia : '' , [Validators.required]],
      //problemas_psiquiatricos_previos: [datos ? datos.problemas_psiquiatricos_previos: '' , [Validators.required]],
      evaluador_firma: [datos ? datos.evaluador_firma: '' , [Validators.required]]
    });
  }

  addDiagnosticoTratamiento():void {
    console.log(this.addForm.value)
    if (this.addForm.invalid) {
      alert("Favor de llenar todos los datos.");
      return;
    }

    MeteorObservable.call('addDiagnosticoTratamiento', this.addForm.value, this.id).subscribe(() => {
      this.router.navigate(['/paciente', this.id]);
    }, (error) => {
      alert(`Failed to add due to ${error}`);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
