import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Meteor } from 'meteor/meteor';
import { MeteorObservable } from 'meteor-rxjs';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
 
import 'rxjs/add/operator/map';

import { Patients } from '../../../../both/collections/patients.collection';
import { Patient } from '../../../../both/models/patient.model';

import template from './patient-summary.component.html';
 
@Component({
  selector: '[patient-summary]',
  template
})
export class PatientSummaryComponent implements OnInit {
    addForm: FormGroup;
    id: string;
    paramsSub: Subscription;
    patient: any;

    // Substances Abuse Var
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

    // Obstetrics Var
    hasRhythm: string;
    hasOralContraceptives: string;
    hasInjectable: string;
    hasDIU: string;
    hasSpermicide: string;
    hasInterruptedIntercourse: string;
    hasPreservative: string;
    hasHysterectomy: string;
    hasSalpingo: string;
    hasMeno: string;
 
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.patient = {};
    // Substances Abuse Var
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

    // Obstetrics Var
    this.hasRhythm = "No";
    this.hasOralContraceptives = "No";
    this.hasInjectable = "No";
    this.hasDIU = "No";
    this.hasSpermicide = "No";
    this.hasInterruptedIntercourse = "No";
    this.hasPreservative = "No";
    this.hasHysterectomy = "No";
    this.hasSalpingo = "No";
    this.hasMeno = "No";
  }

  cancel() {
    this.router.navigate(['/paciente', this.id]);
  }

  ngOnInit() {
    this.paramsSub = this.route.params
        .map(params => params['id'])
        .subscribe(id => {
            this.id = id;
            this.patient = Patients.findOne(this.id);
            // Set substances abuse variables
            this.setSubstancesAbuseVar();
            // Obstetrics Var
            this.setObstetricsVar();
        });

  }

    // Set Substances Abuse Var
    setSubstancesAbuseVar = () => {
        
        if(this.patient.datos_abuso_sustancias.abusos[0].selected){
            this.hasAlcoholAbuse = true;
        }
        if(this.patient.datos_abuso_sustancias.abusos[1].selected){
            this.hasCocaineCrackAbuse = true;
        }
        if(this.patient.datos_abuso_sustancias.abusos[2].selected){
            this.hasOpiatesHeroineAbuse = true;
        }
        if(this.patient.datos_abuso_sustancias.abusos[3].selected){
            this.hasAnfetaminesAbuse = true;
        }
        if(this.patient.datos_abuso_sustancias.abusos[4].selected){
            this.hasHallucinogensAbuse = true;
        }
        if(this.patient.datos_abuso_sustancias.abusos[5].selected){
            this.hasPCPAbuse = true;
        }
        if(this.patient.datos_abuso_sustancias.abusos[6].selected){
            this.hasMarijuanaAbuse = true;
        }
        if(this.patient.datos_abuso_sustancias.abusos[7].selected){
            this.hasInhalantsAbuse = true;
        }
        if(this.patient.datos_abuso_sustancias.abusos[8].selected){
            this.hasSedativesAbuse = true;
        }
        if(this.patient.datos_abuso_sustancias.abusos[9].selected){
            this.hasOthersAbuse = true;
        }
    }

    // Obstetrics Var
    setObstetricsVar = () => {
        if(this.patient.datos_gineco_obstetricos.utiliza_metodos_anticonceptivos[0].selected){
            this.hasRhythm = "Si";
        }
        if(this.patient.datos_gineco_obstetricos.utiliza_metodos_anticonceptivos[1].selected){
            this.hasOralContraceptives = "Si";
        }
        if(this.patient.datos_gineco_obstetricos.utiliza_metodos_anticonceptivos[2].selected){
            this.hasInjectable = "Si";
        }
        if(this.patient.datos_gineco_obstetricos.utiliza_metodos_anticonceptivos[3].selected){
            this.hasDIU = "Si";
        }
        if(this.patient.datos_gineco_obstetricos.utiliza_metodos_anticonceptivos[4].selected){
            this.hasSpermicide = "Si";
        }
        if(this.patient.datos_gineco_obstetricos.utiliza_metodos_anticonceptivos[5].selected){
            this.hasInterruptedIntercourse = "Si";
        }
        if(this.patient.datos_gineco_obstetricos.utiliza_metodos_anticonceptivos[6].selected){
            this.hasPreservative = "Si";
        }

        if(this.patient.datos_gineco_obstetricos.otros_metodos[0].selected){
            this.hasHysterectomy = "Si";
        }
        if(this.patient.datos_gineco_obstetricos.otros_metodos[1].selected){
            this.hasSalpingo = "Si";
        }
        if(this.patient.datos_gineco_obstetricos.otros_metodos[2].selected){
            this.hasMeno = "Si";
        }
    }

    ngOnDestroy() {
        this.paramsSub.unsubscribe();
    }
  
}