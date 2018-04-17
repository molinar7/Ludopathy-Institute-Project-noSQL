import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../../both/collections/patients.collection';
import { Patient } from '../../../../../both/models/patient.model';

import template from './add-gynecological-obstetrics-background.component.html';
 
@Component({
  selector: 'add-gynecological-obstetrics-background',
  template
})
export class AddGynecologicalObstetricsBackgroundComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  id: string;
  paramsSub: Subscription;
  pastContraceptiveMethods: any;
  pastOtherMethods: any;
  patient: Patient
 
  constructor( private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.id = id;
        this.patient = Patients.findOne(this.id);
        if(this.patient.datos_gineco_obstetricos){
          this.pastContraceptiveMethods = this.patient.datos_gineco_obstetricos.utiliza_metodos_anticonceptivos;
          this.pastOtherMethods = this.patient.datos_gineco_obstetricos.otros_metodos;
        }
        else{
          this.pastContraceptiveMethods = [
            {metodo: 'Ritmo', selected: false},
            {metodo: 'Anticonceptivos orales', selected: false},
            {metodo: 'Inyectables', selected: false},
            {metodo: 'DIU', selected: false},
            {metodo: 'Espermicidas', selected: false},
            {metodo: 'Coito interrumpido', selected: false},
            {metodo: 'Preservativo', selected: false}
          ],
          this.pastOtherMethods = [
            {metodo: 'Histerectomía', selected: false},
            {metodo: 'Salpingoclasia', selected: false},
            {metodo: 'Menopausia', selected: false}
          ]
        }
      });

    let datos = this.patient.datos_gineco_obstetricos;

    this.addForm = this.formBuilder.group({
        menarca: [datos ? datos.menarca : '' , [Validators.required]],
        fum: [datos ? datos.fum : '' , [Validators.required]],
        masculino: [datos ? datos.masculino : '' , [Validators.required]],
        ritmo: [datos ? datos.ritmo : '' , [Validators.required]],
        tension_premenstrual: [datos ? datos.tension_premenstrual : '' , [Validators.required]],
        vida_sexual_activa: [datos ? datos.vida_sexual_activa : '' , [Validators.required]],
        num_companeros_sexuales: [datos ? datos.num_companeros_sexuales : '' , [Validators.required]],
        actuales: [datos ? datos.actuales : '' , [Validators.required]],
        gesta: [datos ? datos.gesta : '' , [Validators.required]],
        para: [datos ? datos.para : '' , [Validators.required]],
        cesareas: [datos ? datos.cesareas : '' , [Validators.required]],
        abortos: [datos ? datos.abortos : '' , [Validators.required]],
        embarazo_actual: [datos ? datos.embarazo_actual : '' , [Validators.required]],
        semanas_embarazo: [datos ? datos.semanas_embarazo : '' , [Validators.required]],
        lactancia: [datos ? datos.lactancia : '' , [Validators.required]],
        posibilidad_de_embarazo: [datos ? datos.posibilidad_de_embarazo : '' , [Validators.required]],
        utiliza_metodos_anticonceptivos: this.buildAnticonceptivesMethods(),
        otros_metodos: this.buildOtherMethods()
    });
  }

  get contraceptiveMethods() {
    return this.addForm.get('utiliza_metodos_anticonceptivos');
  };

  get otherMethods() {
    return this.addForm.get('otros_metodos');
  };

  buildAnticonceptivesMethods(){
    const arr = this.pastContraceptiveMethods.map(method => {
      return this.formBuilder.control(method.selected);
    });

    return this.formBuilder.array(arr)
  }

  buildOtherMethods(){
    const arr = this.pastOtherMethods.map(method => {
      return this.formBuilder.control(method.selected);
    });

    return this.formBuilder.array(arr)
  }

  pastContraceptivesMethodsChange(index: number, isChecked: boolean){
    this.pastContraceptiveMethods[index].selected = isChecked;
  }

  pastOtherMethodsChange(index: number, isChecked: boolean){
    this.pastOtherMethods[index].selected = isChecked;
  }

  addGynecologicalObstetricsBackground():void {

    if (this.addForm.invalid) {
      alert("Favor de llenar todos los datos.");
      return;
    }

    let data = this.addForm.value;
    data.utiliza_metodos_anticonceptivos = this.pastContraceptiveMethods;
    data.otros_metodos = this.pastOtherMethods;

    MeteorObservable.call('addGynecologicalObstetricsBackground', data, this.id).subscribe(() => {
      this.router.navigate(['/paciente', this.id]);
    }, (error) => {
      alert(`Failed to add due to ${error}`);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}