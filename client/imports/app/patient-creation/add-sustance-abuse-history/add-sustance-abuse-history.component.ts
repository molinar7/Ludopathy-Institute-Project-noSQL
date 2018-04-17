import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../../both/collections/patients.collection';
import { Patient } from '../../../../../both/models/patient.model';

import template from './add-sustance-abuse-history.component.html';
 
@Component({
  selector: 'add-abuso-sustance-history',
  template
})
export class AddSustanceAbuseHistoryComponent implements OnInit, OnDestroy {
  addForm: FormGroup;
  id: string;
  paramsSub: Subscription;
  pastAbuses: any;
  hasAlcoholAbuse: boolean;
  hasAnfetaminesAbuse: boolean;
  hasMarijuanaAbuse: boolean;
  hasCocaineCrackAbuse: boolean;
  hasHallucinogensAbuse: boolean;
  hasOpiatesHeroineAbuse: boolean;
  hasInhalantsAbuse: boolean;
  hasPCPAbuse: boolean;
  hasSedativesAbuse: boolean;
  hasOthersAbuse: boolean;
  patient: Patient
 
  constructor( private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
    this.hasAlcoholAbuse = false;
    this.hasAnfetaminesAbuse = false;
    this.hasMarijuanaAbuse = false;
    this.hasCocaineCrackAbuse = false;
    this.hasHallucinogensAbuse = false;
    this.hasOpiatesHeroineAbuse = false;
    this.hasInhalantsAbuse = false;
    this.hasPCPAbuse = false;
    this.hasSedativesAbuse = false;
    this.hasOthersAbuse = false;
  }

  ngOnInit() {
    this.paramsSub = this.route.params
      .map(params => params['id'])
      .subscribe(id => {
        this.id = id;
        this.patient = Patients.findOne(this.id);
        if(this.patient.datos_abuso_sustancias){
          this.pastAbuses = this.patient.datos_abuso_sustancias.abusos;
          this.hasAlcoholAbuse = this.patient.datos_abuso_sustancias.abuso_alcohol ? true : false;
          this.hasAnfetaminesAbuse = this.patient.datos_abuso_sustancias.abuso_anfetaminas ? true : false;
          this.hasMarijuanaAbuse = this.patient.datos_abuso_sustancias.abuso_marihuana ? true : false;
          this.hasCocaineCrackAbuse = this.patient.datos_abuso_sustancias.abuso_cocaina_crack ? true : false;
          this.hasHallucinogensAbuse = this.patient.datos_abuso_sustancias.abuso_alucionogenos ? true : false;
          this.hasOpiatesHeroineAbuse = this.patient.datos_abuso_sustancias.abuso_inhalantes ? true : false;
          this.hasInhalantsAbuse = this.patient.datos_abuso_sustancias.abuso_opiaceos_heroina ? true : false;
          this.hasPCPAbuse = this.patient.datos_abuso_sustancias.abuso_pcp ? true : false;
          this.hasSedativesAbuse = this.patient.datos_abuso_sustancias.abuso_sedantes_hipnoticos_ansioliticos ? true : false;
          this.hasOthersAbuse = this.patient.datos_abuso_sustancias.abuso_otros ? true : false;
        }
        else{
          this.pastAbuses = [
            {abuso: 'Alcohol', informacion: '', selected: false},
            {abuso: 'Cocaína/Crack', informacion: '', selected: false},
            {abuso: 'Opiáceos/Heroína', informacion: '', selected: false},
            {abuso: 'Anfetaminas', informacion: '', selected: false},
            {abuso: 'Alucinógenos', informacion: '', selected: false},
            {abuso: 'PCP', informacion: '', selected: false},
            {abuso: 'Marihuana', informacion: '', selected: false},
            {abuso: 'Inhalantes', informacion: '', selected: false},
            {abuso: 'Sedantes,hipnóticos, ansiolíticos', informacion: '', selected: false},
            {abuso: 'Otros (especifique)', informacion: '', selected: false}
          ]
        }
      });

    let datos = this.patient.datos_abuso_sustancias;

    this.addForm = this.formBuilder.group({

      abusos: this.buildAbuse(),
      abuso_alcohol: [datos ? datos.abuso_alcohol : ''],
      abuso_anfetaminas: [datos ? datos.abuso_anfetaminas : ''],
      abuso_marihuana: [datos ? datos.abuso_marihuana : ''],
      abuso_cocaina_crack: [datos ? datos.abuso_cocaina_crack : ''],
      abuso_alucionogenos: [datos ? datos.abuso_alucionogenos : ''],
      abuso_inhalantes: [datos ? datos.abuso_inhalantes : ''],
      abuso_opiaceos_heroina: [datos ? datos.abuso_opiaceos_heroina : ''],
      abuso_pcp: [datos ? datos.abuso_pcp : ''],
      abuso_sedantes_hipnoticos_ansioliticos: [datos ? datos.abuso_sedantes_hipnoticos_ansioliticos : ''],
      abuso_otros: [datos ? datos.abuso_otros : ''],
      abuso_problemas_consumo_sustancias: [datos ? datos.abuso_problemas_consumo_sustancias : '' , [Validators.required]]
    });
  }

  get abuses() {
    return this.addForm.get('abusos');
  };

  buildAbuse(){
    const arr = this.pastAbuses.map(abuse => {
      return this.formBuilder.control(abuse.selected);
    });

    return this.formBuilder.array(arr)
  }

  pastAbusesChange(index: number, isChecked: boolean){
    this.pastAbuses[index].selected = isChecked;

    if(this.pastAbuses[index].abuso == 'Alcohol'){
      this.hasAlcoholAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_alcohol'].setValue('');
      }
    }
    if(this.pastAbuses[index].abuso == 'Anfetaminas'){
      this.hasAnfetaminesAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_anfetaminas'].setValue('');
      }
    }
    if(this.pastAbuses[index].abuso == 'Marihuana'){
      this.hasMarijuanaAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_marihuana'].setValue('');
      }
    }
    if(this.pastAbuses[index].abuso == 'Cocaína/Crack'){
      this.hasCocaineCrackAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_cocaina_crack'].setValue('');
      }
    }
    if(this.pastAbuses[index].abuso == 'Alucinógenos'){
      this.hasHallucinogensAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_alucionogenos'].setValue('');
      }
    }
    if(this.pastAbuses[index].abuso == 'Inhalantes'){
      this.hasInhalantsAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_inhalantes'].setValue('');
      }
    }
    if(this.pastAbuses[index].abuso == 'Opiáceos/Heroína'){
      this.hasOpiatesHeroineAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_opiaceos_heroina'].setValue('');
      }
    }
    if(this.pastAbuses[index].abuso == 'PCP'){
      this.hasPCPAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_pcp'].setValue('');
      }
    }
    if(this.pastAbuses[index].abuso == 'Sedantes,hipnóticos, ansiolíticos'){
      this.hasSedativesAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_sedantes_hipnoticos_ansioliticos'].setValue('');
      }
    }
    if(this.pastAbuses[index].abuso == 'Otros (especifique)'){
      this.hasOthersAbuse = isChecked;
      if(!isChecked){
        this.addForm.controls['abuso_otros'].setValue('');
      }
    }
    
  }

  addSustanceAbuseHistory():void {

    if (this.addForm.invalid) {
      alert("Favor de llenar todos los datos.");
      return;
    }

    let data = this.addForm.value;
    data.abusos = this.pastAbuses;

    MeteorObservable.call('addSustanceAbuseHistory', data, this.id).subscribe(() => {
      this.router.navigate(['/paciente', this.id]);
    }, (error) => {
      alert(`Failed to add due to ${error}`);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}