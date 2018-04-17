import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../../both/collections/patients.collection';
import { Patient } from '../../../../../both/models/patient.model';

import template from './add-history.component.html';
 
@Component({
  selector: 'add-history',
  template
})
export class AddHistoryComponent implements OnInit, OnDestroy {
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

    let datos = this.patient.datos_historia;

    this.addForm = this.formBuilder.group({
      historia_psicosocial_y_del_desarrollo: [datos ? datos.historia_psicosocial_y_del_desarrollo : '', [Validators.required]],
      snc: [datos ? datos.snc : '', [Validators.required]],
      trastornos_convulsivos: [datos ? datos.trastornos_convulsivos : '', Validators.required],
      respiratorias: [datos ? datos.respiratorias : '', Validators.required],
      cardiovasculares: [datos ? datos.cardiovasculares : '', Validators.required],
      hematopoyecticas_linfaticas: [datos ? datos.hematopoyecticas_linfaticas : '', Validators.required],
      ojos_nariz_oidos_garganta: [datos ? datos.ojos_nariz_oidos_garganta : '', Validators.required],
      hepaticas: [datos ? datos.hepaticas : '', Validators.required],
      dermatologicas_tejido_conectivo: [datos ? datos.dermatologicas_tejido_conectivo : '', Validators.required],
      musculo_esqueleticas: [datos ? datos.musculo_esqueleticas : '', Validators.required],
      endocrinas_metabolicas: [datos ? datos.endocrinas_metabolicas : '', Validators.required],
      gastrointestinales: [datos ? datos.gastrointestinales : '', Validators.required],
      renales_genitourinarias: [datos ? datos.renales_genitourinarias : '', Validators.required],
      cancer: [datos ? datos.cancer : '', Validators.required],
      alergia_hipersensibilidad_a_medicamentos: [datos ? datos.alergia_hipersensibilidad_a_medicamentos : '', Validators.required],
      intervenciones_quirurgicas_mayores: [datos ? datos.intervenciones_quirurgicas_mayores : '', Validators.required],
      intervenciones_quirurgicas_programadas: [datos ? datos.intervenciones_quirurgicas_programadas : '', Validators.required],
      otros: [datos ? datos.otros : '', Validators.required],
      snc1: [datos ? datos.snc1 : ''],
      trastornos_convulsivos1: [datos ? datos.trastornos_convulsivos1 : ''],
      respiratorias1: [datos ? datos.respiratorias1 : ''],
      cardiovasculares1: [datos ? datos.cardiovasculares1 : ''],
      hematopoyecticas_linfaticas1: [datos ? datos.hematopoyecticas_linfaticas1 : ''],
      ojos_nariz_oidos_garganta1: [datos ? datos.oido_nariz_garganta : ''],
      hepaticas1: [datos ? datos.hepaticas1 : ''],
      dermatologicas_tejido_conectivo1: [datos ? datos.dermatologicas_tejido_conectivo1 : ''],
      musculo_esqueleticas1: [datos ? datos.musculo_esqueleticas1 : ''],
      endocrinas_metabolicas1: [datos ? datos.endocrinas_metabolicas1 : ''],
      gastrointestinales1: [datos ? datos.gastrointestinales1 : ''],
      renales_genitourinarias1: [datos ? datos.renales_genitourinarias1 : ''],
      cancer1: [datos ? datos.cancer1 : ''],
      alergia_hipersensibilidad_a_medicamentos1: [datos ? datos.alergia_hipersensibilidad_a_medicamentos1 : ''],
      intervenciones_quirurgicas_mayores1: [datos ? datos.intervenciones_quirurgicas_mayores1 : ''],
      intervenciones_quirurgicas_programadas1: [datos ? datos.intervenciones_quirurgicas_programadas1 : ''],
      otros1: [datos ? datos.otros1 : ''],


      condicion_general: [datos ? datos.condicion_general : '', [Validators.required]],
      piel: [datos ? datos.piel : '', Validators.required],
      cabeza: [datos ? datos.cabeza : '', Validators.required],
      ojos: [datos ? datos.ojos : '', Validators.required],
      oido_nariz_garganta: [datos ? datos.ojos_nariz_oidos_garganta : '', Validators.required],
      cuello_tiroides: [datos ? datos.cuello_tiroides : '', Validators.required],
      pulmones: [datos ? datos.pulmones : '', Validators.required],
      corazon: [datos ? datos.corazon : '', Validators.required],
      sistema_gastrointestinal: [datos ? datos.sistema_gastrointestinal : '', Validators.required],
      nodulos_linfaticos: [datos ? datos.nodulos_linfaticos : '', Validators.required],
      higado_vesicula_biliar: [datos ? datos.higado_vesicula_biliar : '', Validators.required],
      sistema_urogenital: [datos ? datos.sistema_urogenital : '', Validators.required],
      sistema_musculo_esqueletico: [datos ? datos.sistema_musculo_esqueletico : '', Validators.required],
      neurologico: [datos ? datos.neurologico : '', Validators.required],
      otro: [datos ? datos.otro : '', Validators.required],
      condicion_general1: [datos ? datos.condicion_general1 : ''],
      piel1: [datos ? datos.piel1 : ''],
      cabeza1: [datos ? datos.cabeza1 : ''],
      ojos1: [datos ? datos.ojos1 : ''],
      oido_nariz_garganta1: [datos ? datos.oido_nariz_garganta1: ''],
      cuello_tiroides1: [datos ? datos.cuello_tiroides1 : ''],
      pulmones1: [datos ? datos.pulmones1: ''],
      corazon1: [datos ? datos.corazon1 : ''],
      sistema_gastrointestinal1: [datos ? datos.sistema_gastrointestinal1 : ''],
      nodulos_linfaticos1: [datos ? datos.nodulos_linfaticos1 : ''],
      higado_vesicula_biliar1: [datos ? datos.higado_vesicula_biliar1 : ''],
      sistema_urogenital1: [datos ? datos.sistema_urogenital1 : ''],
      sistema_musculo_esqueletico1: [datos ? datos.sistema_musculo_esqueletico1 : ''],
      neurologico1: [datos ? datos.neurologico1 : ''],
      otro1: [datos ? datos.otro1 : ''],

      
      esquizofrenia: [datos ? datos.esquizofrenia : '', [Validators.required]],
      trastorno_bipolar: [datos ? datos.trastorno_bipolar : '', Validators.required],
      alcoholismo: [datos ? datos.alcoholismo : '', Validators.required],
      drogadiccion: [datos ? datos.drogadiccion : '', Validators.required],
      depresion_mayor: [datos ? datos.depresion_mayor : '', Validators.required],
      distimia: [datos ? datos.distimia : '', Validators.required],
      ataques_de_panico: [datos ? datos.ataques_de_panico : '', Validators.required],
      agorafobia: [datos ? datos.agorafobia : '', Validators.required],
      trastorno_obsesivo_compulsivo: [datos ? datos.trastorno_obsesivo_compulsivo : '', Validators.required],
      fobia_social: [datos ? datos.fobia_social : '', Validators.required],
      fobia_especifica: [datos ? datos.fobia_especifica : '', Validators.required],
      ansiedad_generalizada: [datos ? datos.ansiedad_generalizada : '', Validators.required],
      demencia: [datos ? datos.demencia : '', Validators.required],
      retardo_mental: [datos ? datos.retardo_mental : '', Validators.required],
      trastorno_de_personalidad: [datos ? datos.trastorno_de_personalidad : '', Validators.required],
      otrofam: [datos ? datos.otrofam : '', Validators.required],
      datos_relevantes_historia_familiar: [datos ? datos.datos_relevantes_historia_familiar : '', Validators.required],
      esquizofrenia_quien: [datos ? datos.esquizofrenia_quien : ''],
      trastorno_bipolar_quien: [datos ? datos.trastorno_bipolar_quien : ''],
      alcoholismo_quien: [datos ? datos.alcoholismo_quien : ''],
      drogadiccion_quien: [datos ? datos.drogadiccion_quien : ''],
      depresion_mayor_quien: [datos ? datos.depresion_mayor_quien : ''],
      distimia_quien: [datos ? datos.distimia_quien : ''],
      ataques_de_panico_quien: [datos ? datos.ataques_de_panico_quien : ''],
      agorafobia_quien: [datos ? datos.agorafobia_quien : ''],
      trastorno_obsesivo_compulsivo_quien: [datos ? datos.trastorno_obsesivo_compulsivo_quien : ''],
      fobia_social_quien: [datos ? datos.fobia_social_quien : ''],
      fobia_especifica_quien: [datos ? datos.fobia_especifica_quien : ''],
      ansiedad_generalizada_quien: [datos ? datos.ansiedad_generalizada_quien : ''],
      demencia_quien: [datos ? datos.demencia_quien : ''],
      retardo_mental_quien: [datos ? datos.retardo_mental_quien : ''],
      trastorno_de_personalidad_quien: [datos ? datos.trastorno_de_personalidad_quien : ''],
      otrofam_quien: [datos ? datos.otrofam_quien : '']
    });
  }

  addHistory():void {
    console.log(this.addForm.value)
    if (this.addForm.invalid) {
      alert("Favor de llenar todos los datos.");
      return;
    }

    MeteorObservable.call('addHistory', this.addForm.value, this.id).subscribe(() => {
      this.router.navigate(['/paciente', this.id]);
    }, (error) => {
      alert(`Failed to add due to ${error}`);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
