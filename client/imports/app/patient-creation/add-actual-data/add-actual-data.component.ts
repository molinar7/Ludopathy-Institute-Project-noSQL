import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../../both/collections/patients.collection';
import { Patient } from '../../../../../both/models/patient.model';

import template from './add-actual-data.component.html';
 
@Component({
  selector: 'add-actual-data',
  template
})
export class AddActualDataComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  id: string;
  paramsSub: Subscription;
  pastTreatments: any;
  otherTreatment: boolean;
  patient: Patient
 
  constructor( private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.otherTreatment = false;
  }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.id = id;
        this.patient = Patients.findOne(this.id);
        if(this.patient.datos_episodio_actual){
          this.pastTreatments = this.patient.datos_episodio_actual.tratamiento_episodio_actual;
          this.otherTreatment = this.patient.datos_episodio_actual.otro_tratamiento ? true : false;
        }
        else{
          this.pastTreatments = [
            {treatment: 'Antidepresivos Tri o tetracíclicos', selected: false},
            {treatment: 'Estabilizadores de afecto', selected: false},
            {treatment: 'ISRS', selected: false},
            {treatment: 'Barbitúricos', selected: false},
            {treatment: 'Inhibidores de la MAO', selected: false},
            {treatment: 'TEC', selected: false},
            {treatment: 'Benzodiacepinas', selected: false},
            {treatment: 'Psicoterapia', selected: false},
            {treatment: 'Antipsicóticos', selected: false},
            {treatment: 'Otro', selected: false},
            {treatment: 'ISRSN', selected: false},
            {treatment: 'No sabe', selected: false}
          ]
        }
      });

    let datos = this.patient.datos_episodio_actual;

    this.addForm = this.formBuilder.group({
      peea: [datos ? datos.peea : '', Validators.required],
      episodio_actual: [datos ? datos.episodio_actual : '', Validators.required],
      episodios_previos: [datos ? datos.episodios_previos : '', Validators.required],
      edad_primer_episodio: [datos ? datos.edad_primer_episodio : '', Validators.required],
      inicio_sintomas_episodio_actual: [datos ? datos.inicio_sintomas_episodio_actual : '', Validators.required],
      fecha_inicio_episodio_actual: [datos ? datos.fecha_inicio_episodio_actual : '', Validators.required],
      tratamiento_episodio_actual: this.buildTreatment(),
      psicofarmacos_episodio_actual: [datos ? datos.psicofarmacos_episodio_actual : ''],
      otro_tratamiento: [datos ? datos.otro_tratamiento : '']
    });
  }

  get treatments() {
    return this.addForm.get('tratamiento_episodio_actual');
  };

  buildTreatment(){
    const arr = this.pastTreatments.map(treatment => {
      return this.formBuilder.control(treatment.selected);
    });

    return this.formBuilder.array(arr)
  }

  pastTreatmentsChange(index: number, isChecked: boolean){
    this.pastTreatments[index].selected = isChecked

    if(this.pastTreatments[index].treatment == 'Otro'){
      this.otherTreatment = isChecked;
      if(!isChecked){
        this.addForm.controls['otro_tratamiento'].setValue('');
      }
    }
  }

  addActualData():void {

    if (this.addForm.invalid) {
      alert("Favor de llenar todos los datos.");
      return;
    }

    let data = this.addForm.value;
    data.tratamiento_episodio_actual = this.pastTreatments;

    MeteorObservable.call('addActualData', data, this.id).subscribe(() => {
      this.router.navigate(['/paciente', this.id]);
    }, (error) => {
      alert(`Failed to add due to ${error}`);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
