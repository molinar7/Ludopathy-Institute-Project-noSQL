import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../../both/collections/patients.collection';
import { Patient } from '../../../../../both/models/patient.model';

import template from './add-pathological-background.component.html';
 
@Component({
  selector: 'add-pathological-background',
  template
})
export class AddPathologicalBackgroundComponent implements OnInit, OnDestroy {
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

    let datos = this.patient.datos_antecedentes_patologicos;

    this.addForm = this.formBuilder.group({
      snc: [datos ? datos.snc : '' , [Validators.required]],
      trastornos_convulsivos: [datos ? datos.trastornos_convulsivos : '' , [Validators.required]],
      respiratorias: [datos ? datos.respiratorias : '' , [Validators.required]],
      cardiovasculares: [datos ? datos.cardiovasculares : '' , [Validators.required]],
      hematopoyecticas_linfaticas: [datos ? datos.hematopoyecticas_linfaticas : '' , [Validators.required]],
      ojos_nariz_oidos_garganta: [datos ? datos.ojos_nariz_oidos_garganta : '' , [Validators.required]],
      hepaticas: [datos ? datos.hepaticas : '' , [Validators.required]],
      dermatologicas_tejido_conectivo: [datos ? datos.dermatologicas_tejido_conectivo : '' , [Validators.required]],
      musculo_esqueleticas: [datos ? datos.musculo_esqueleticas : '' , [Validators.required]],
      endocrinas_metabolicas: [datos ? datos.endocrinas_metabolicas : '' , [Validators.required]],
      gastrointestinales: [datos ? datos.gastrointestinales : '' , [Validators.required]],
      renales_genitourinarias: [datos ? datos.renales_genitourinarias : '' , [Validators.required]],
      cancer: [datos ? datos.cancer : '' , [Validators.required]],
      alergia_hipersensibilidad_a_medicamentos: [datos ? datos.alergia_hipersensibilidad_a_medicamentos : '' , [Validators.required]],
      intervenciones_quirurgicas_mayores: [datos ? datos.intervenciones_quirurgicas_mayores : '' , [Validators.required]],
      otros: [datos ? datos.otros : '' , [Validators.required]],

      notas_antecedentes_personales_patologicos_y_no_patologicos: [datos ? datos.notas_antecedentes_personales_patologicos_y_no_patologicos : '' , [Validators.required]],
      toma_cafe: [datos ? datos.toma_cafe : '' , [Validators.required]],
      tazas_de_cafe: [datos ? datos.tazas_de_cafe : '' , [Validators.required]],
      tabaquismo: [datos ? datos.tabaquismo : '' , [Validators.required]],
      consumo_diario_tabaco: [datos ? datos.consumo_diario_tabaco : '' , [Validators.required]],
      anos_tabaquismo: [datos ? datos.anos_tabaquismo : '' , [Validators.required]],
      edad_inicio: [datos ? datos.edad_inicio : '' , [Validators.required]],
      edad_suspension: [datos ? datos.edad_suspension : '' , [Validators.required]],
      bebidas_alcoholicas: [datos ? datos.bebidas_alcoholicas : '' , [Validators.required]],
      frecuencia_y_cantidad: [datos ? datos.frecuencia_y_cantidad : '' , [Validators.required]],
      sintio_dejar_de_tomar: [datos ? datos.sintio_dejar_de_tomar : '' , [Validators.required]],
      sintio_culpable_forma_tomar: [datos ? datos.sintio_culpable_forma_tomar : '' , [Validators.required]],
      calmar_nervios_cortar_cruda: [datos ? datos.calmar_nervios_cortar_cruda : '' , [Validators.required]]
    });
  }

  addPathologicalBackground():void {
    console.log(this.addForm.value)
    if (this.addForm.invalid) {
      alert("Favor de llenar todos los datos.");
      return;
    }

    MeteorObservable.call('addPathologicalBackground', this.addForm.value, this.id).subscribe(() => {
      this.router.navigate(['/paciente', this.id]);
    }, (error) => {
      alert(`Failed to add due to ${error}`);
    });
  }

  ngOnDestroy() {
    this.paramsSub.unsubscribe();
  }
}
