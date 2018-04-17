import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../../both/collections/patients.collection';
import { Patient } from '../../../../../both/models/patient.model';

import template from './add-examen-mental.component.html';
 
@Component({
  selector: 'add-examen-mental',
  template
})
export class AddExamenMentalComponent implements OnInit, OnDestroy {
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

    let datos = this.patient.datos_examen_mental;

    this.addForm = this.formBuilder.group({
      escalas_realizadas_por: [datos ? datos.escalas_realizadas_por : '' , [Validators.required]],
      hamd: [datos ? datos.hamd : '' , [Validators.required]],
      hama: [datos ? datos.hama : '' , [Validators.required]],
      ybocs: [datos ? datos.ybocs : '' , [Validators.required]],
      qlesq: [datos ? datos.qlesq : '' , [Validators.required]],
      gadi: [datos ? datos.gadi : '' , [Validators.required]],
      bdi: [datos ? datos.bdi : '' , [Validators.required]],
      spin: [datos ? datos.spin : '' , [Validators.required]],
      pas: [datos ? datos.pas : '' , [Validators.required]],
      descripcion_hallazgos: [datos ? datos.descripcion_hallazgos: '' , [Validators.required]],
      tension_sistolica_acostado_PT: [datos ? datos.tension_sistolica_acostado_PT : '' , [Validators.required]],
      tension_sistolica_acostado_ST: [datos ? datos.tension_sistolica_acostado_ST : '' , [Validators.required]],
      tension_sistolica_parado_PT: [datos ? datos. tension_sistolica_parado_PT: '' , [Validators.required]],
      tension_sistolica_parado_ST: [datos ? datos.tension_sistolica_parado_ST : '' , [Validators.required]],
      tension_diastolica_acostado_PT: [datos ? datos. tension_diastolica_acostado_PT : '' , [Validators.required]],
      tension_diastolica_acostado_ST: [datos ? datos.tension_diastolica_acostado_ST : '' , [Validators.required]],
      tension_diastolica_parado_PT: [datos ? datos.tension_diastolica_parado_PT : '' , [Validators.required]],
      tension_diastolica_parado_ST: [datos ? datos.tension_diastolica_parado_ST: '' , [Validators.required]],
      frecuencia_cardiaca_acostado: [datos ? datos.frecuencia_cardiaca_acostado : '' , [Validators.required]],
      frecuencia_cardiaca_parado: [datos ? datos.frecuencia_cardiaca_parado : '' , [Validators.required]],
      ritmo_regular: [datos ? datos.ritmo_regular: '' , [Validators.required]],
      ritmo_irregular: [datos ? datos.ritmo_irregular : '' , [Validators.required]],
      peso: [datos ? datos.peso : '' , [Validators.required]],
      talla: [datos ? datos.talla : '' , [Validators.required]],
      circunferencia_abdominal: [datos ? datos.circunferencia_abdominal: '' , [Validators.required]],
      temperatura: [datos ? datos.temperatura : '' , [Validators.required]],
      peso_usual: [datos ? datos.peso_usual: '' , [Validators.required]],
      imc: [datos ? datos.imc : '' , [Validators.required]],
      resultados_laboratorio_y_gabinete: [datos ? datos.resultados_laboratorio_y_gabinete : '' , [Validators.required]]
      
    });
  }

  addExamenMental():void {
    console.log(this.addForm.value)
    if (this.addForm.invalid) {
      alert("Favor de llenar todos los datos.");
      return;
    }

    MeteorObservable.call('addExamenMental', this.addForm.value, this.id).subscribe(() => {
      this.router.navigate(['/paciente', this.id]);
    }, (error) => {
      alert(`Failed to add due to ${error}`);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
